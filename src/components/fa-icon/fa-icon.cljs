(ns fa-icon
  (:require [cherry.core :refer [defclass]]
            [helpers :refer [hiccup-to-node]]))

;; This approach didn't work with <a href="/contact"><fa-icon:
;; <object type="image/svg+xml" data={path} style="height: 14pt">
;; The result wasn't navigable as a link.

(defn render []
  #html [:link {:rel "stylesheet" :href "/css/fa-icon.css"}])

(defclass FaIcon
  (extends HTMLElement)
  (constructor [this]
               (super)
               (.attachShadow this #js {"mode" "open"})
               (set! (.-innerHTML (.-shadowRoot this)) (render)))

  Object
  (^:async connectedCallback [this]
   (let [name (.getAttribute this "name")
         qualified-name (if (.includes name "/") name (str "solid/" name))
         path (str "/svg/" qualified-name ".svg")
         response (js/await (js/fetch path))
         svg (js/await (.text response))
         colour (.getAttribute this "colour")]
     (let [svg-node (hiccup-to-node svg)]
       (.appendChild (.-shadowRoot this) svg-node)

       (when colour
         (let [path-node (aget (.-children svg-node) 0)]
           (.setAttribute path-node "fill" colour)))))))

(js/customElements.define "fa-icon" FaIcon)
