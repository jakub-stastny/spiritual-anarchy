import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as squint_html from 'squint-cljs/src/squint/html.js';
import { email_chunks } from 'config';
import { hiccup_to_node } from 'helpers';
var build_email = (function () {
return cherry_core.apply.call(null, cherry_core.str, email_chunks);
});
var build_mailto = (function (subject) {
return cherry_core.str.call(null, "mailto:", build_email.call(null), "?subject=", encodeURIComponent(subject));
});
var insert_default = (function (root, subject) {
const email1 = build_email.call(null);
const mailto2 = build_mailto.call(null, subject);
return root.appendChild(hiccup_to_node.call(null, squint_html.tag`<a href="${squint_html.attr(mailto2)}">${email1}</a>`));
});
var update_children = (function (subject, children) {
const mailto1 = build_mailto.call(null, subject);
let seq__182 = cherry_core.seq.call(null, children);
let chunk__193 = null;
let count__204 = 0;
let i__215 = 0;
while(true){
if ((i__215) < (count__204)) {
const node6 = cherry_core._nth.call(null, chunk__193, i__215);
if (cherry_core.truth_.call(null, (() => {
const and__23499__auto__7 = cherry_core.instance_QMARK_.call(null, HTMLElement, node6);
if (cherry_core.truth_.call(null, and__23499__auto__7)) {
return cherry_core._EQ_.call(null, node6.tagName, "A");} else {
return and__23499__auto__7;}
})())) {
node6.href = mailto1;
};
let G__8 = seq__182;
let G__9 = chunk__193;
let G__10 = count__204;
let G__11 = cherry_core.unchecked_inc.call(null, i__215);
seq__182 = G__8;
chunk__193 = G__9;
count__204 = G__10;
i__215 = G__11;
continue;
} else {
const temp__23012__auto__12 = cherry_core.seq.call(null, seq__182);
if (cherry_core.truth_.call(null, temp__23012__auto__12)) {
const seq__1813 = temp__23012__auto__12;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, seq__1813))) {
const c__23227__auto__14 = cherry_core.chunk_first.call(null, seq__1813);
let G__15 = cherry_core.chunk_rest.call(null, seq__1813);
let G__16 = c__23227__auto__14;
let G__17 = cherry_core.count.call(null, c__23227__auto__14);
let G__18 = 0;
seq__182 = G__15;
chunk__193 = G__16;
count__204 = G__17;
i__215 = G__18;
continue;
} else {
const node19 = cherry_core.first.call(null, seq__1813);
if (cherry_core.truth_.call(null, (() => {
const and__23499__auto__20 = cherry_core.instance_QMARK_.call(null, HTMLElement, node19);
if (cherry_core.truth_.call(null, and__23499__auto__20)) {
return cherry_core._EQ_.call(null, node19.tagName, "A");} else {
return and__23499__auto__20;}
})())) {
node19.href = mailto1;
};
let G__21 = cherry_core.next.call(null, seq__1813);
let G__22 = null;
let G__23 = 0;
let G__24 = 0;
seq__182 = G__21;
chunk__193 = G__22;
count__204 = G__23;
i__215 = G__24;
continue;
}}};break;
}

});
class MyEmail extends HTMLElement {
  constructor() {
super();const self__ = this;
const this$ = this;
  }
connectedCallback() { 
const this$ = this;
const self__ = this;const subject1 = (() => {
const or__23477__auto__2 = this$.getAttribute("subject");
if (cherry_core.truth_.call(null, or__23477__auto__2)) {
return or__23477__auto__2;} else {
return "Hey. I found your website.";}
})();
const children3 = this$.children;
if (cherry_core.truth_.call(null, cherry_core.empty_QMARK_.call(null, children3))) {
return insert_default.call(null, this$, subject1);} else {
return update_children.call(null, subject1, children3);}
}};
customElements.define("my-email", MyEmail);

export { build_email, build_mailto, insert_default, update_children, MyEmail }
