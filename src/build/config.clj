(ns config)

(def js-dir "pages/js")
(def fn-dir "netlify/functions")
(def vendor-dir "pages/vendor")
(def cljs-glob "**/*.cljs")

(def css-dir "pages/css")
(def css-globs ["stylesheets/*.css" "components/**/*.css"])

(def html-dir "pages")
(def page-glob "pages/*.edn")

(def svg-dirs (map #(str html-dir %) ["/svg/solid" "/svg/regular" "/svg/brands"]))
(def svgs
  ["solid/envelope.svg" "solid/spinner.svg" "solid/money-bill-1-wave.svg"

   "brands/youtube.svg" "brands/reddit.svg" "brands/github.svg"
   "brands/cc-paypal.svg" "brands/github-alt.svg" "brands/square-github.svg"])
