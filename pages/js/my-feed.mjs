import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as squint_html from 'squint-cljs/src/squint/html.js';
import { time_ago, no_self_referring_link, get_BANG_ } from 'helpers';
var get_url = (function (path) {
return cherry_core.str.call(null, "https://raw.githack.com/jakub-stastny/data.spiritual-anarchy/generated-data/feed", path);
});
var fetch_feed = (async function (path) {
const response1 = (await fetch(get_url.call(null, path)));
const data2 = (await response1.json());
return cherry_core.js__GT_clj.call(null, data2, cherry_core.keyword("keywordize-keys"), true);
});
var render_tag = (function (tag) {
return squint_html.tag`<li><a href="${squint_html.attr(cherry_core.str.call(null, "/tags/", tag))}">${tag}</a></li>`;
});
var render_item = (function (p__1) {
const map__21 = p__1;
const map__22 = cherry_core.__destructure_map.call(null, map__21);
const title3 = cherry_core.get.call(null, map__22, cherry_core.keyword("title"));
const date_added4 = cherry_core.get.call(null, map__22, cherry_core.keyword("date-added"));
const link5 = cherry_core.get.call(null, map__22, cherry_core.keyword("link"));
const tags6 = cherry_core.get.call(null, map__22, cherry_core.keyword("tags"));
const notes7 = cherry_core.get.call(null, map__22, cherry_core.keyword("notes"));
return squint_html.tag`<article><div style="display: flex"><h3><a href="${squint_html.attr(link5)}" target="_blank" rel="noopener">${title3}</a></h3><p class="date">${time_ago.call(null, new Date(date_added4))}</p></div><ul class="tags">${cherry_core.map.call(null, render_tag, tags6)}</ul>${cherry_core.map.call(null, (function (note) {
return squint_html.tag`<p>${note}</p>`;
}), notes7)}</article>`;
});
var render = (async function (path) {
const feed1 = (await fetch_feed.call(null, path));
return squint_html.tag`<link rel="stylesheet" href="/css/my-feed.css"><section>${cherry_core.map.call(null, render_item, feed1)}</section>`;
});
class MyFeed extends HTMLElement {
  constructor() {
super();const self__ = this;
const this$ = this;
this$.attachShadow(({ "mode": "open" }))  }
async connectedCallback() { 
const this$ = this;
const self__ = this;const path1 = this$.getAttribute("path");
const html2 = (await render.call(null, path1));
return this$.shadowRoot.innerHTML = html2;
;
}};
customElements.define("my-feed", MyFeed);

export { get_url, fetch_feed, render_tag, render_item, render, MyFeed }
