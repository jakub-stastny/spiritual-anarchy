(ns build-router
  (:require [clojure.string :as str]
            [utils :as utils]))

;; TODO: Move from src/assets to src/data.
(defn -main []
  (let [path "src/assets/router.json"]
    (utils/ensure-parent-dir path)
    (spit path (utils/pretty-print-json (utils/generate-routes))))

  ;; TODO: The redirects should come from config.
  (let [redirects "/contact  https://jakubstastny.me/contact  301"]
    (spit "pages/_redirects" redirects)))
