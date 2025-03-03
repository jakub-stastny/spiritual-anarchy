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
        about (item-link (get! router :about))
        spiritual-guidance (item-link (get! router :services-guidance))
        astro-reading (item-link (get! router :services-reading))
        remote-healing (item-link (get! router :services-healing))
        services [#html [:span {:id "services"} (item-link (get! router :services) {:class "mobile"})]
                  #html [:ul {:class "large-screen"}
                         [:li spiritual-guidance]
                         [:li remote-healing]
                         [:li astro-reading]]]
        contact (item-link (get! router :contact))]
    #html [:<>
           [:link {:rel "stylesheet" :href "/css/my-nav.css"}]
           [:nav
            [:ul [:li main] [:li about] [:li services] [:li contact]]]]))

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
