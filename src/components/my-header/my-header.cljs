;; Since this is defined as a web component with shadow DOM,
;; its content isn't accessible to assistive technologies and
;; web crawlers (think SEO).

;; This is fine for now, but would the requirements change, making
;; it a light component (one without shadow DOM) would do the trick.

(ns my-header
  (:require [helpers :refer [no-self-referring-link]])
  (:require-macros [macros :refer [component]]))

(defn render [_]
  #html [:<>
         [:link {:rel "stylesheet" :href "/css/my-header.css"}]
         [:header
          [:div {:class "wrapper" :style "opacity: 0;"}]
          [:h1 (no-self-referring-link "Jakub Šťastný" "/")]
          [:h2 {:class "tagline"} "Spiritual guide & energy healer"]]])

(component MyHeader "my-header" render)
