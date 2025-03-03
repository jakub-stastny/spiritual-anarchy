(ns macros)

;; (defclass MyFooter
;;   (extends HTMLElement)

;;   (constructor [this]
;;                (super)
;;                (.attachShadow this #js {"mode" "open"}))

;;   Object
;;   (connectedCallback [this]
;;                      (render (.-shadowRoot this))))

;; (js/customElements.define "my-footer" MyFooter)

;; We can't use helper fns here due to how CLJS macros work.
(defmacro component [class-name element-name render-fn & setup-fns]
  `(do
     (cherry.core/defclass ~class-name
       (~'extends js/HTMLElement)
       (~'constructor [~'this]
        (~'super)
        ;; You can't emit a JS object (#js {...}) from a macro.
        (.attachShadow ~'this (js-obj "mode" "open")))

       ~'Object
       (~'connectedCallback [~'this]
         (~'set! (.-innerHTML (.-shadowRoot ~'this)) (~render-fn ~'this))
         ~@(map (fn [setup-fn] `(~setup-fn ~'this (.-shadowRoot ~'this))) setup-fns)
         nil))

     (js/customElements.define ~element-name ~class-name)))
