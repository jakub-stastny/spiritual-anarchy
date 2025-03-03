(ns build-css
  (:require [clojure.string :as str]
            [babashka.fs :as fs]
            [utils :as utils]
            [config :as config]))

(defn process-args [args flags]
  (fs/create-dirs config/css-dir)
  (doseq [source-path args]
    (let [target-path (str config/css-dir "/" (fs/file-name source-path))]
      (println (str "~ CSS " source-path " -> " target-path))
      (let [minifier (if (contains? flags :release) utils/minify-css identity)]
        (spit target-path (minifier (slurp source-path)))))))

(defn process-default [flags]
  (fs/delete-tree config/css-dir)
  (doseq [glob config/css-globs]
    (process-args
     (remove utils/emacs-file? (map str (fs/glob "src" glob)))
     flags)))

(utils/generate-main-fn process-args process-default)
