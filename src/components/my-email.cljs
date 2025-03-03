(ns my-footer
  (:require [cherry.core :refer [defclass]]
            [config :refer [email-chunks]]
            [helpers :refer [hiccup-to-node]])
  (:require-macros [macros :refer [component]]))

(defn- build-email [] (apply str email-chunks))

(defn- build-mailto [subject]
  (str "mailto:" (build-email) "?subject=" (js/encodeURIComponent subject)))

(defn- insert-default [root subject]
  (let [email (build-email)
        mailto (build-mailto subject)]
    (.appendChild root (hiccup-to-node #html [:a {:href mailto} email]))))

(defn- update-children [subject children]
  (let [mailto (build-mailto subject)]
    (doseq [node children]
      (when (and (instance? js/HTMLElement node)
                 (= (.-tagName node) "A"))
        (set! (.-href node) mailto)))))

;; Insert default mailto link:
;; <my-email></my-email>
;;
;; Update href:
;; <my-email subject="Hey there!" >
;;   <a class="button">Order now</a>
;; </my-email>

;; No shadow DOM, so the styles (such as text-decoration: none) propagate
;; without having to define them separately in my-email.css.
;;
;; For shadow DOM, we'd create <slot> element and append it to the shadow root.
;; We'd then retrieve it in connectedCallback (.querySelector shadow-root "slot")
;; and check (.assignedNodes slot) for children.
;;
;; Without shadow DOM it's simply in this.children.
(defclass MyEmail
  (extends HTMLElement)

  (constructor [this] (super))

  Object
  (connectedCallback [this]
                     (let [subject (or (.getAttribute this "subject") "Hey. I found your website.")
                           children (.-children this)]
                       (if (empty? children)
                         (insert-default this subject)
                         (update-children subject children)))))

(js/customElements.define "my-email" MyEmail)
