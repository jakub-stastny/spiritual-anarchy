(ns utils
  (:require [clojure.string :as str]
            [clojure.edn :as edn]
            [config :as config]
            [cheshire.core :as json]
            [babashka.fs :as fs]))

;; This simple approach works well for basic minification by reducing
;; the file size. However, it doesn’t handle advanced optimizations
;; like merging duplicate rules, resolving shorthand properties, or
;; removing unnecessary units (e.g., 0px to 0), which more sophisticated
;; minifiers do.
(defn minify-css [css]
  (-> css
      (str/replace #"/\*[^*]*\*+(?:[^/*][^*]*\*+)*/" "")
      (str/replace #"\s+" " ")
      (str/replace #"\s*([{}:;,])\s*" "$1")
      (str/trim)))

(defn minify-js [code]
  (-> code
      ;; Remove single-line comments
      (str/replace #"(//.*)$" "")

      ;; Remove multi-line comments
      (str/replace #"/\*[^*]*\*+(?:[^/*][^*]*\*+)*/" "")

      ;; Replace multiple spaces or newlines with a single space
      (str/replace #"\s+" " ")

      ;; Remove spaces around JS syntax characters
      (str/replace #"\s*([{};,:()])\s*" "$1")
      (str/trim)))

(defn copy-cherry []
  (println "~ Copying Cherry JS libs.")
  (fs/delete-tree config/vendor-dir)
  (let [target-dir (str config/vendor-dir "/cherry-cljs")]
    (fs/create-dirs target-dir)
    (fs/copy "node_modules/cherry-cljs/lib/cljs.core.js" target-dir)
    ;; (fs/copy "node_modules/cherry-cljs/lib/clojure.set.js" target-dir)
    ;; (fs/copy "node_modules/cherry-cljs/lib/clojure.walk.js" target-dir)
    (fs/copy "node_modules/cherry-cljs/lib/clojure.string.js" target-dir))

  (let [target-dir (str config/vendor-dir "/squint-cljs")]
    (fs/create-dirs target-dir)
    (fs/copy "node_modules/squint-cljs/src/squint/core.js" target-dir)
    (fs/copy "node_modules/squint-cljs/src/squint/html.js" target-dir)))

(defn ensure-parent-dir [file-path]
  (when (str/includes? (subs file-path 6) "/")
    (fs/create-dirs (str/join "/" (butlast (str/split file-path #"/"))))))

(defn recreate-dir [path]
  (fs/delete-tree path) (fs/create-dirs path))

(defn emacs-file? [path]
  (str/includes? path "#"))

(defn process-args [args fn-args fn-default]
  (let [group (group-by #(str/starts-with? % "--") args)
        flags (into #{} (map #(keyword (str/replace-first % #"^--" "")) (group true)))
        paths (group false)]
    (if (seq paths) (fn-args paths flags) (fn-default flags))))

(defmacro generate-main-fn [fn-args fn-default]
  `(defn ~'-main [& ~'args]
     (~process-args ~'args ~fn-args ~fn-default)))

(defn- read-page [path]
  (try
    (edn/read-string (slurp path))
    (catch Exception error
      (println (str "Error parsing " path ": " (.getMessage error) "."))
      (throw error))))

(defn generate-routes []
  (let [paths (map str (fs/glob "src/pages" "*.edn"))]
    (reduce (fn [acc path]
              (let [data (read-page path)
                    route {(data :key) (dissoc data :key :content)}]
                (merge acc route)))
            {} paths)))

(defn pretty-print-json [data]
  (json/generate-string data {:pretty true}))
