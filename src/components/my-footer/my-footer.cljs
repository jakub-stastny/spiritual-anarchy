;; Since this is defined as a web component with shadow DOM,
;; its content isn't accessible to assistive technologies and
;; web crawlers (think SEO).

;; This is fine for now, but would the requirements change, making
;; it a light component (one without shadow DOM) would do the trick.

(ns my-footer
  (:require [helpers :refer [css-var]]
            ;; [config :refer [youtube-link reddit-link]]
            )
  (:require-macros [macros :refer [component]]))

;; Dependencies
;;
;; Script tags inside the shadow DOM are not executed in the same way
;; they would be if they were in the main document. When you include a
;; script tag inside the shadow root, it does not have the same global
;; scope as when it’s included in the main document. Therefore, the script
;; may not load or execute as expected within the shadow DOM context.
(js/import "/js/fa-icon.mjs")
(js/import "/js/my-email.mjs")

(defn- social-icon [name link]
  #html [:a {:href link :target "_blank" :rel "noopener"}
         [:fa-icon {:name (str "brands/" name)
                    :colour (css-var (str name "-colour"))}]])

(defn- render-footer []
  #html [:ul {:class "footer-icons"}
         [:li (social-icon "youtube" youtube-link)]
         [:li [:my-email {:subject "Hey there!"}
               [:a [:fa-icon {:name "envelope" :colour (css-var "envelope-colour")}]]]]
         [:li (social-icon "reddit" reddit-link)]])

(defn render [_]
  #html [:<>
         [:link {:rel "stylesheet" :href "/css/my-footer.css"}]
         [:footer
          "&nbsp;"
          ;; (render-footer)
          ]])

(component MyFooter "my-footer" render)
