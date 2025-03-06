import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as squint_html from 'squint-cljs/src/squint/html.js';
import { no_self_referring_link, get_BANG_ } from 'helpers';
var fetch_router = (async function () {
const response1 = (await fetch("/assets/router.json"));
const data2 = (await response1.json());
return cherry_core.js__GT_clj.call(null, data2, cherry_core.keyword("keywordize-keys"), true);
});
var item_link = (() => {
const f1 = (function (var_args) {
const G__41 = cherry_core.alength.call(null, arguments);
switch (G__41) {case 1:
return f1.cljs$core$IFn$_invoke$arity$1((arguments[0]));
break;
case 2:
return f1.cljs$core$IFn$_invoke$arity$2((arguments[0]), (arguments[1]));
break;
default:
throw new Error(cherry_core.str.call(null, "Invalid arity: ", cherry_core.alength.call(null, arguments)))}
});
f1.cljs$core$IFn$_invoke$arity$1 = (function (router_entry) {
return item_link.call(null, router_entry, cherry_core.array_map());
});
f1.cljs$core$IFn$_invoke$arity$2 = (function (router_entry, opts) {
return no_self_referring_link.call(null, (() => {
const or__23477__auto__3 = cherry_core.get.call(null, router_entry, cherry_core.keyword("heading"));
if (cherry_core.truth_.call(null, or__23477__auto__3)) {
return or__23477__auto__3;} else {
return cherry_core.get.call(null, router_entry, cherry_core.keyword("title"));}
})(), get_BANG_.call(null, router_entry, cherry_core.keyword("path")), opts);
});
f1.cljs$lang$maxFixedArity = 2;
return f1;
})();
var render = (async function () {
const router1 = (await fetch_router.call(null));
const main2 = item_link.call(null, get_BANG_.call(null, router1, cherry_core.keyword("index")));
const manifesto3 = item_link.call(null, get_BANG_.call(null, router1, cherry_core.keyword("manifesto")));
const about4 = item_link.call(null, get_BANG_.call(null, router1, cherry_core.keyword("about")));
const wiki_hall_of_fame5 = item_link.call(null, get_BANG_.call(null, router1, cherry_core.keyword("wiki-hall-of-fame")));
const wiki6 = cherry_core.vector(squint_html.tag`<span id="wiki">${item_link.call(null, get_BANG_.call(null, router1, cherry_core.keyword("wiki")), cherry_core.array_map(cherry_core.keyword("class"), "mobile"))}</span>`, squint_html.tag`<ul class="large-screen"><li>${wiki_hall_of_fame5}</li></ul>`);
return squint_html.tag`<link rel="stylesheet" href="/css/my-nav.css"><nav><ul><li>${main2}</li><li>${manifesto3}</li><li>${wiki6}</li><li>${about4}</li><li><a href="/contact">Contact</a></li></ul></nav>`;
});
class MyNav extends HTMLElement {
  constructor() {
super();const self__ = this;
const this$ = this;
this$.attachShadow(({ "mode": "open" }))  }
async connectedCallback() { 
const this$ = this;
const self__ = this;const html1 = (await render.call(null));
return this$.shadowRoot.innerHTML = html1;
;
}};
customElements.define("my-nav", MyNav);

export { fetch_router, item_link, render, MyNav }
