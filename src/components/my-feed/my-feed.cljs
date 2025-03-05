;; How to handle dynamic URLs such as /tags/kundalini etc?
;; Currently we only have 1 template (core.clj). We might need :template option to override.
;; Having bunch of boilerplate files in pages such as pages/tags/kundalini.edn would be a good thing
;; (as long as there's little code), because it's precisely where we can stick any extra info and descriptions.
;;
;; We can generate these files on the go from /tags.json and /authors.json.
(ns my-feed
  (:require [cherry.core :refer [defclass]]
            [helpers :refer [time-ago no-self-referring-link get!]]))

(defn get-url [path]
  (str "https://raw.githack.com/jakub-stastny/data.spiritual-anarchy/generated-data/feed" path))

(defn- ^:async fetch-feed [path]
  (let [response (js/await (js/fetch (get-url path)))
        data (js/await (.json response))]
    (js->clj data :keywordize-keys true)))

(defn render-tag [tag]
  #html [:li [:a {:href (str "/tags/" tag)} tag]])

(defn render-item [{:keys [title date-added link tags notes]}]
  #html [:article
         [:div {:style "display: flex"}
          [:h3 [:a {:href link :target "_blank" :rel "noopener"} title]]
          [:p {:class "date"} (time-ago (new Date date-added))]]
         [:ul {:class "tags"} (map render-tag tags)]
         (map (fn [note] #html [:p note]) notes)])

(defn ^:async render [path]
  (let [feed (js/await (fetch-feed path))]
    #html [:<>
           [:link {:rel "stylesheet" :href "/css/my-feed.css"}]
           [:section (map render-item feed)]]))

(defclass MyFeed
  (extends HTMLElement)
  (constructor [this]
               (super)
               (.attachShadow this #js {"mode" "open"}))

  Object
  (^:async connectedCallback [this]
   (let [path (.getAttribute this "path")
         html (js/await (render path))]
     (set! (.-innerHTML (.-shadowRoot this)) html))))

(js/customElements.define "my-feed" MyFeed)
