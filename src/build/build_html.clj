(ns build-html
  (:require [clojure.string :as str]
            [clojure.edn :as edn]
            [babashka.fs :as fs]
            [config :as config]
            [utils :as utils]
            [templates.core :refer [template routes]]))

;; The input is data from the EDN files in src/pages.
(defn page [{:keys [path title heading content] :as edn-data}]
  (let [path-fix-index (if (str/ends-with? path "/") (str path "index") path)
        html-path (str config/html-dir path-fix-index ".html")
        css-base
        (if (str/includes? (subs path 1) "/")
          (get (str/split path #"/") 1)
          (subs path-fix-index 1))
        css-path (str "/css/" css-base ".css")]
    (println (str "~ Building " html-path "."))
    (utils/ensure-parent-dir html-path)
    (spit html-path (template edn-data css-path))))

;; It'd be best to automate, however in my-footer there's dynamic code.
(defn copy-svgs []
  (doseq [svg-dir config/svg-dirs]
    (fs/create-dirs svg-dir))

  (doseq [source-path (map #(str "src/svgs/" %) config/svgs)]
    (let [parent-dir (fs/file-name (fs/parent source-path))
          base-name (fs/file-name source-path)
          target-path (str config/html-dir "/svg/" parent-dir "/" base-name)]
      (println (str "~ SVG " target-path))
      (fs/copy source-path target-path {:replace-existing true}))))

(defn write-robots-txt []
  (println (str "~ Building " config/html-dir "/robots.txt."))
  (let [paths (map :path (vals routes))
        lines (concat ["User-agent: *" "Disallow: /"]
                      (map #(str "Allow: " % "$") paths))]
    (spit (str config/html-dir "/robots.txt") (str/join "\n" lines))))

(defn process-args [args flags]
  (fs/create-dirs config/html-dir)
  (doseq [path args]
    (page (edn/read-string (slurp path)))))

(defn process-default [flags]
  (write-robots-txt)
  (copy-svgs)
  (process-args
   (remove utils/emacs-file?
           (map str (fs/glob "src" config/page-glob)))
   flags))

(utils/generate-main-fn process-args process-default)
