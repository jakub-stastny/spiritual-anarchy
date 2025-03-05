(ns my-newsletter
  (:require [config :refer [custom-domain]])
  (:require-macros [macros :refer [component]]))

(js/import "/js/fa-icon.mjs")
(js/import "/js/my-email.mjs")

(defn prn [& args]
  (apply js/console.log (map #(clj->js %) args)))

(def subscribe-endpoint (str custom-domain "/.netlify/functions/subscribe"))

(defn- ^:async subscribe [email]
  (let [headers
        {:method "POST"
         :headers {"Content-Type" "application/json"}
         :body (js/JSON.stringify (clj->js {:email email}))}]
    (try
      (js/await (js/fetch subscribe-endpoint (clj->js headers)))
      (catch js/Error e
        (js/console.error "Error:" e) false))))

(def success-html
  #html [:div "You are now subscribed to the mailing list. Thank you!"])

(def error-html
  #html [:div
         [:h3 "Error"]
         [:p
          "Unfortunately it wasn't possible to subscribe to the mailing list. "
          "Please try again and if the problem persists, "
          "I'd really appreciate if you could let me know at "
          [:my-email]]])

(defn- generate-submit-handler [shadow-root]
  ;; Cherry doesn't support async on anonymous fns.
  (fn ^:async [event]
    (.preventDefault event)
    (let [form (.-target event)
          flash-div (.querySelector shadow-root "#flash")
          spinner (.querySelector shadow-root "fa-icon")]
      (set! (.-style.display spinner) "inline-block")
      ;; (js/await (subscribe (.. form -email -value)))
      (.then (subscribe (.. form -email -value))
             (fn [result]
               (if result
                 (do
                   (.add (.-classList flash-div) "success")
                   (set! (.-innerHTML flash-div) success-html)
                   (set! (.-style.display form) "none")
                   (set! (.-value (.-email form))))
                 (do
                   (.add (.-classList flash-div) "error")
                   (set! (.-innerHTML flash-div) error-html)))
               (set! (.-style.display spinner) "none"))))))

(defn render [_]
  #html [:<>
         [:link {:rel "stylesheet" :href "/css/my-newsletter.css"}]

         [:div {:id "newsletter"}
          [:h2 "Subscribe to our newsletter!"]
          [:p {:id "tagline"} "Don't miss out on the latest tips. Be in the know."]

          [:fa-icon {:name "spinner" :style "display: none"}]

          [:div {:id "flash"}]
          ;; Uncomment these to test success/error states.
          ;; [:div {:id "flash" :class "success"} success-html]
          ;; [:div {:id "flash" :class "error"} error-html]

          [:form
           [:div {:style "display: flex"}
            [:input {:type "email" :name "email" :required true :placeholder "you@email.com"}]
            [:button {:type "submit"} "Subscribe"]]]]])

(defn setup [component shadow-root]
  (let [form (.querySelector shadow-root "form")]
    (.addEventListener form "submit" (generate-submit-handler shadow-root))))

(component MyNewsletter "my-newsletter" render setup)
