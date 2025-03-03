;; https://app.netlify.com/sites/jakubstastny/logs/functions/subscribe
;; https://developers.mailerlite.com/docs/subscribers.html#create-upsert-subscriber

(ns netlify.functions.subscribe
  (:require [os :as os]
            [axios :as all-axios]))

(def axios (.-default all-axios))

(def api-token (.. process -env -MAILER_LITE_API_TOKEN))
(def group-id "129574750637787099")
(def headers
  {"Content-Type" "application/json"
   "Accept" "application/json"
   "Authorization" (str "Bearer " api-token)})

(defn endpoint [path]
  (str "https://connect.mailerlite.com/api" path))

(when-not api-token
  (js/console.error "Please set MAILER_LITE_API_TOKEN.")
  (js/process.exit 1))

(defn- parse-json [body]
  (try
    [nil (js->clj (js/JSON.parse body) :keywordize-keys true)]
    (catch :default error
      (js/console.log "ERROR" error)
      [error nil])))

(defn- to-json [message]
  (str (js/JSON.stringify #js {:message message} nil 2) "\n"))

(defn- response
  ([status body]
   (response status body {}))

  ([status body headers]
   (let [cors-headers
         {"Access-Control-Allow-Origin" "*"
          "Access-Control-Allow-Headers" "Content-Type"
          "Access-Control-Allow-Methods" "HEAD, POST, OPTIONS"}]
     #js {:statusCode status
          :body (to-json body)
          :headers (clj->js (merge cors-headers headers))})))

(defn ^:async subscribe [email]
  ;; Keep this here, so in case something goes wrong, we
  ;; can still recover a (recent) email from Netlify logs.
  (js/console.log (str "Subscribing " email "."))
  (try
    (let [data {:email email :groups [group-id]}
          options {:headers headers}
          api-response (js/await (.post axios (endpoint "/subscribers") (clj->js data) (clj->js options)))]
      ;; (js/console.log (.. api-response -data -data))
      (response 204 ""))
    (catch js/Error error
      (js/console.log (str "Error when subscribing " email))
      (js/console.log error)
      (response 400 (str error)))))

(defn- ^:async handle-post [event context]
  (let [[error data] (parse-json (.-body event))]
    (js/console.log "handle-post" error (clj->js data))
    (cond
      error                   (response 400 (ex-info error))
      (contains? data :email) (js/await (subscribe (:email data)))
      :else                   (response 400 "Validation error: key 'email' is missing."))))

(defn- dbg [event context fun]
  (let [result (fun event context)]
    (js/console.log "Response" result)
    result))

(defn ^:async handler [event context]
  (js/console.log "handler")
  (dbg event context
       (fn [event context]
         (let [method (.-httpMethod event)]
           (cond (= method "POST")    (handle-post event context)
                 (= method "HEAD")    (response 201 "") ;; FIXME: This doesn't work, looks like GET.
                 (= method "OPTIONS") (response 204 "" {"Allow" "HEAD, POST, OPTIONS"})
                 :else                (response 405 "Method not allowed"))))))

;; On macOS you can subscribe users by running:
;; npx cherry run src/serverless/subscribe.cljs joe@gmail.com
(when (= (.platform os) "darwin")
  (let [args (drop 4 (js->clj (.-argv js/process)))]
    (if (empty? args)
      (subscribe "joe@gmail.com")
      (doseq [email args] (subscribe email)))))
