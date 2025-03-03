(ns service-info
  (:require-macros [macros :refer [component]]))

(defn render [component]
  (let [donation (or (.getAttribute component "donation") 100)
        duration (or (.getAttribute component "duration") "1 hour")
        styles (or (.getAttribute component "style") {})]
    #html [:<>
           [:link {:rel "stylesheet" :href "/css/service-info.css"}]
           [:p {:id "details" :style styles}
            [:strong "Suggested donation: "] (str  "$" donation) ", "
            [:strong "duration: "] (str duration ".")]]))

(component ServiceInfo "service-info" render)
