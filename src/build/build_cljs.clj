(ns build-cljs
  (:require [clojure.string :as str]
            [babashka.fs :as fs]
            [babashka.process :as process]
            [utils :as utils]
            [config :as config]))

;; Cherry has --output-dir option, but it recreates all the dirs, we need flat.
(defn- process-fn [source-cljs-path source-mjs-path]
  (let [target-path (str config/fn-dir "/" (fs/file-name source-mjs-path))]
    (println (str "~ FN " source-cljs-path " -> " config/fn-dir))
    (process/shell "npx" "cherry" "compile" source-cljs-path)
    (fs/move source-mjs-path target-path {:replace-existing true})))

(defn- process-js [source-cljs-path source-mjs-path flags]
  (let [target-path (str config/js-dir "/" (fs/file-name source-mjs-path))]
    (println (str "~ JS " source-cljs-path " -> " target-path))
    (process/shell "npx" "cherry" "compile" source-cljs-path)
    (let [minifier (if (contains? flags :release) utils/minify-js identity)]
      (spit target-path (minifier (slurp source-mjs-path))))))

(defn process-args [paths flags]
  (doseq [source-cljs-path paths]
    (let [source-mjs-path (str/replace source-cljs-path #"\.cljs$" ".mjs")]
      (if (str/starts-with? source-cljs-path "src/serverless/")
        (process-fn source-cljs-path source-mjs-path)
        (process-js source-cljs-path source-mjs-path flags)))))

(defn process-default [flags]
  (utils/recreate-dir config/js-dir)
  (utils/recreate-dir config/fn-dir)

  (utils/copy-cherry)

  (let [paths (map str (fs/glob "src" config/cljs-glob))]
    (process-args (remove utils/emacs-file? paths) flags)))

(utils/generate-main-fn process-args process-default)
