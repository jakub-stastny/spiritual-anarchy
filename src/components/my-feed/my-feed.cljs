;; Upon adding an item to the feed, run a generator and regenerate tags.
(ns my-feed
  (:require [cherry.core :refer [defclass]]
            [helpers :refer [time-ago no-self-referring-link get!]]))

(def main-feed-url "https://raw.githack.com/jakub-stastny/data.spiritual-anarchy/generated-data/feed/posts.json")

(defn- ^:async fetch-feed []
  (let [response (js/await (js/fetch main-feed-url))
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

(defn ^:async render []
  (let [feed (js/await (fetch-feed))]
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
   (let [html (js/await (render))]
     (set! (.-innerHTML (.-shadowRoot this)) html))))

(js/customElements.define "my-feed" MyFeed)
