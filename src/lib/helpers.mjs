import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as squint_html from 'squint-cljs/src/squint/html.js';
var set_attrs = (function (element, map) {
let seq__11 = cherry_core.seq.call(null, map);
let chunk__22 = null;
let count__33 = 0;
let i__44 = 0;
while(true){
if ((i__44) < (count__33)) {
const vec__55 = cherry_core._nth.call(null, chunk__22, i__44);
const key6 = cherry_core.nth.call(null, vec__55, 0, null);
const value7 = cherry_core.nth.call(null, vec__55, 1, null);
element.setAttribute(cherry_core.name.call(null, key6), value7);
let G__8 = seq__11;
let G__9 = chunk__22;
let G__10 = count__33;
let G__11 = cherry_core.unchecked_inc.call(null, i__44);
seq__11 = G__8;
chunk__22 = G__9;
count__33 = G__10;
i__44 = G__11;
continue;
} else {
const temp__23012__auto__12 = cherry_core.seq.call(null, seq__11);
if (cherry_core.truth_.call(null, temp__23012__auto__12)) {
const seq__113 = temp__23012__auto__12;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, seq__113))) {
const c__23227__auto__14 = cherry_core.chunk_first.call(null, seq__113);
let G__15 = cherry_core.chunk_rest.call(null, seq__113);
let G__16 = c__23227__auto__14;
let G__17 = cherry_core.count.call(null, c__23227__auto__14);
let G__18 = 0;
seq__11 = G__15;
chunk__22 = G__16;
count__33 = G__17;
i__44 = G__18;
continue;
} else {
const vec__819 = cherry_core.first.call(null, seq__113);
const key20 = cherry_core.nth.call(null, vec__819, 0, null);
const value21 = cherry_core.nth.call(null, vec__819, 1, null);
element.setAttribute(cherry_core.name.call(null, key20), value21);
let G__22 = cherry_core.next.call(null, seq__113);
let G__23 = null;
let G__24 = 0;
let G__25 = 0;
seq__11 = G__22;
chunk__22 = G__23;
count__33 = G__24;
i__44 = G__25;
continue;
}}};break;
}
;
return element;
});
var set_children = (function (element, list) {
let seq__111 = cherry_core.seq.call(null, list);
let chunk__122 = null;
let count__133 = 0;
let i__144 = 0;
while(true){
if ((i__144) < (count__133)) {
const child5 = cherry_core._nth.call(null, chunk__122, i__144);
element.appendChild((cherry_core.truth_.call(null, cherry_core.string_QMARK_.call(null, child5))) ? (document.createTextNode(child5)) : (child5));
let G__6 = seq__111;
let G__7 = chunk__122;
let G__8 = count__133;
let G__9 = cherry_core.unchecked_inc.call(null, i__144);
seq__111 = G__6;
chunk__122 = G__7;
count__133 = G__8;
i__144 = G__9;
continue;
} else {
const temp__23012__auto__10 = cherry_core.seq.call(null, seq__111);
if (cherry_core.truth_.call(null, temp__23012__auto__10)) {
const seq__1111 = temp__23012__auto__10;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, seq__1111))) {
const c__23227__auto__12 = cherry_core.chunk_first.call(null, seq__1111);
let G__13 = cherry_core.chunk_rest.call(null, seq__1111);
let G__14 = c__23227__auto__12;
let G__15 = cherry_core.count.call(null, c__23227__auto__12);
let G__16 = 0;
seq__111 = G__13;
chunk__122 = G__14;
count__133 = G__15;
i__144 = G__16;
continue;
} else {
const child17 = cherry_core.first.call(null, seq__1111);
element.appendChild((cherry_core.truth_.call(null, cherry_core.string_QMARK_.call(null, child17))) ? (document.createTextNode(child17)) : (child17));
let G__18 = cherry_core.next.call(null, seq__1111);
let G__19 = null;
let G__20 = 0;
let G__21 = 0;
seq__111 = G__18;
chunk__122 = G__19;
count__133 = G__20;
i__144 = G__21;
continue;
}}};break;
}

});
var set_inner_html = (function (element, html) {
return element.innerHTML = html;
;
});
var set_content = (function (element, content) {
if (cherry_core.truth_.call(null, cherry_core.vector_QMARK_.call(null, content))) {
return set_children.call(null, element, content);} else {
if (cherry_core.truth_.call(null, cherry_core.string_QMARK_.call(null, content))) {
return set_inner_html.call(null, element, content);} else {
if (cherry_core.truth_.call(null, cherry_core.instance_QMARK_.call(null, HTMLElement, content))) {
return element.appendChild(content);} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return console.log("[set-content] Invalid attribute type", content);} else {
return null;}}}}
});
var no_self_referring_link = (() => {
const f15 = (function (var_args) {
const G__181 = cherry_core.alength.call(null, arguments);
switch (G__181) {case 2:
return f15.cljs$core$IFn$_invoke$arity$2((arguments[0]), (arguments[1]));
break;
case 3:
return f15.cljs$core$IFn$_invoke$arity$3((arguments[0]), (arguments[1]), (arguments[2]));
break;
default:
throw new Error(cherry_core.str.call(null, "Invalid arity: ", cherry_core.alength.call(null, arguments)))}
});
f15.cljs$core$IFn$_invoke$arity$2 = (function (title, link) {
return no_self_referring_link.call(null, title, link, cherry_core.array_map());
});
f15.cljs$core$IFn$_invoke$arity$3 = (function (title, link, opts) {
if (cherry_core.truth_.call(null, cherry_core._EQ_.call(null, window.location.pathname, link))) {
return squint_html.tag`<span ${squint_html.attrs(cherry_core.clj__GT_js.call(null, opts),cherry_core.clj__GT_js.call(null, cherry_core.array_map()))}>${title}</span>`;} else {
return squint_html.tag`<a ${squint_html.attrs(cherry_core.clj__GT_js.call(null, cherry_core.merge.call(null, opts, cherry_core.array_map("href", link))),cherry_core.clj__GT_js.call(null, cherry_core.array_map()))}>${title}</a>`;}
});
f15.cljs$lang$maxFixedArity = 3;
return f15;
})();
var css_var = (function (name) {
const css_var_name1 = cherry_core.str.call(null, "--", name);
const computed_styles2 = getComputedStyle.call(null, document.documentElement);
return computed_styles2.getPropertyValue(css_var_name1);
});
var get_BANG_ = (function (m, k) {
if (cherry_core.truth_.call(null, cherry_core.contains_QMARK_.call(null, m, k))) {
return cherry_core.get.call(null, m, k);} else {
throw cherry_core.ex_info.call(null, cherry_core.str.call(null, "Key '", k, "' not found in the map"), cherry_core.array_map(cherry_core.keyword("map"), m, cherry_core.keyword("key"), k))}
});
var hiccup_to_node = (function (html_string) {
const parser1 = new DOMParser();
const document2 = parser1.parseFromString(html_string, "text/html");
if (cherry_core.truth_.call(null, cherry_core._EQ_.call(null, document2.body.childElementCount, 1))) {
return document2.body.firstChild;} else {
throw new Error(cherry_core.str.call(null, "Not exactly 1 child element in:", html_string))}
});

export { set_attrs, set_children, set_inner_html, set_content, no_self_referring_link, css_var, get_BANG_, hiccup_to_node }
