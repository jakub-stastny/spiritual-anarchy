(ns helpers)

(defn- set-attrs [element map]
  (doseq [[key value] map]
    (.setAttribute element (name key) value))
  element)

(defn- set-children [element list]
  (doseq [child list]
    (.appendChild element
                  (if (string? child)
                    (.createTextNode js/document child)
                    child))))

(defn- set-inner-html [element html]
  (set! element -innerHTML html))

(defn- set-content [element content]
  (cond
    (vector? content)
    (set-children element content)

    (string? content)
    (set-inner-html element content)

    (instance? js/HTMLElement content)
    (.appendChild element content)

    :else
    (js/console.log "[set-content] Invalid attribute type" content)))

;; (defn tag
;;   ([tag-name]
;;    (js/document.createElement (name tag-name)))

;;   ([tag-name arg]
;;    (let [element (js/document.createElement (name tag-name))]
;;      (if (map? arg)
;;        (set-attrs element arg)
;;        (set-content element arg))
;;      element))

;;   ([tag-name attrs content]
;;    (let [element (js/document.createElement (name tag-name))]
;;      (set-attrs element attrs)
;;      (set-content element content)
;;      element)))

(defn no-self-referring-link
  ([title link]
   (no-self-referring-link title link {}))
  ([title link opts]
   (if (= js/window.location.pathname link)
     #html [:span {:& opts} title]
     #html [:a {:& (merge opts {:href link})} title])))

;; TODO: add css-var! that fails if no CSS var was found or empty.
(defn css-var [name]
  (let [css-var-name (str "--" name)
        computed-styles (getComputedStyle document.documentElement)]
    (.getPropertyValue computed-styles css-var-name)))

(defn get! [m k]
  (if (contains? m k)
    (get m k)
    (throw (ex-info (str "Key '" k "' not found in the map")
                    {:map m :key k}))))

;; const parser = new DOMParser();
;; const doc = parser.parseFromString(htmlString, 'text/html');
;; return doc.body.firstChild;
(defn hiccup-to-node [html-string]
  (let [parser (new js/DOMParser)
        document (.parseFromString parser html-string "text/html")]
    (if (= (.. document -body -childElementCount) 1)
      (.. document -body -firstChild)
      (throw (new Error (str "Not exactly 1 child element in:" html-string))))))
