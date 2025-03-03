(ns my-feed
  (:require [cherry.core :refer [defclass]]
            [helpers :refer [no-self-referring-link get!]]))

(defn- ^:async fetch-feed []
  (let [response (js/await (js/fetch "/assets/feed.json")) ;; TODO: Change to a raw githack URL to another repo.
        data (js/await (.json response))]
    (js->clj data :keywordize-keys true)))

(defn render-item [{:keys [title link tags notes]}]
  #html [:article
         [:h3 [:a {:href link :target "_blank" :rel "noopener"} title]]
         [:p {:class "tags"} (.join (clj->js tags) ", ")] ; TODO: Make it ul/li probably? Show # in front of each and a link.
         [:p notes]])

(defn ^:async render []
  (let [feed (js/await (fetch-feed))]
    #html [:<>
           [:link {:rel "stylesheet" :href "/css/my-feed.css"}]
           [:section (map #(render-item %) feed)]]))

(defclass MyFeed
  (extends HTMLElement)
  (constructor [this]
               (super)
               (.attachShadow this #js {"mode" "open"}))

  Object
  (^:async connectedCallback [this]
   (let [html (js/await (render))]
     (set! (.-innerHTML (.-shadowRoot this)) html))))

(js/customElements.define "my-feed" MyFeed)
