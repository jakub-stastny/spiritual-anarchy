(ns build-router
  (:require [clojure.string :as str]
            [config :as config]
            [utils :as utils]))

(defn- rule [[a b]] (str/join " " [a b 301]))

;; TODO: Move from src/assets to src/data.
(defn -main []
  (let [path "src/assets/router.json"]
    (utils/ensure-parent-dir path)
    (spit path (utils/pretty-print-json (utils/generate-routes))))

  (spit "pages/_redirects" (str/join "\n" (map rule config/redirects))))
