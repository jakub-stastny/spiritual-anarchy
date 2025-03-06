;; Since this is defined as a web component with shadow DOM,
;; its content isn't accessible to assistive technologies and
;; web crawlers (think SEO).

;; This is fine for now, but would the requirements change, making
;; it a light component (one without shadow DOM) would do the trick.

(ns my-nav
  (:require [cherry.core :refer [defclass]]
            [helpers :refer [no-self-referring-link get!]]))

(defn- ^:async fetch-router []
  (let [response (js/await (js/fetch "/assets/router.json"))
        data (js/await (.json response))]
    (js->clj data :keywordize-keys true)))

(defn- item-link
  ([router-entry]
   (item-link router-entry {}))
  ([router-entry opts]
   (no-self-referring-link
    (or (get router-entry :heading) (get router-entry :title))
    (get! router-entry :path)
    opts)))

(defn ^:async render []
  (let [router (js/await (fetch-router))
        main (item-link (get! router :index))
        manifesto (item-link (get! router :manifesto))
        about (item-link (get! router :about))
        wiki-hall-of-fame (item-link (get! router :wiki-hall-of-fame))
        wiki [#html [:span {:id "wiki"} (item-link (get! router :wiki) {:class "mobile"})]
                  #html [:ul {:class "large-screen"}
                         [:li wiki-hall-of-fame]]]]
    #html [:<>
           [:link {:rel "stylesheet" :href "/css/my-nav.css"}]
           [:nav
            [:ul [:li main] [:li manifesto] [:li wiki] [:li about] [:li [:a {:href "/contact" :taget "_blank"} "Contact"]]]]]))

(defclass MyNav
  (extends HTMLElement)
  (constructor [this]
               (super)
               (.attachShadow this #js {"mode" "open"}))

  Object
  (^:async connectedCallback [this]
   (let [html (js/await (render))]
     (set! (.-innerHTML (.-shadowRoot this)) html))))

(js/customElements.define "my-nav" MyNav)
