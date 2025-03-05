import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as squint_html from 'squint-cljs/src/squint/html.js';
import { custom_domain } from 'config';
import("/js/fa-icon.mjs");
import("/js/my-email.mjs");
var prn = (() => {
const f18 = (function (var_args) {
const args191 = cherry_core.array.call(null);
const len__22502__auto__2 = cherry_core.alength.call(null, arguments);
let i203 = 0;
while(true){
if ((i203) < (len__22502__auto__2)) {
args191.push((arguments[i203]));
let G__4 = (i203 + 1);
i203 = G__4;
continue;
};break;
}
;
const argseq__22661__auto__5 = ((0) < (cherry_core.alength.call(null, args191))) ? (new cherry_core.IndexedSeq(args191.slice(0), 0, null)) : (null);
return f18.cljs$core$IFn$_invoke$arity$variadic(argseq__22661__auto__5);
});
f18.cljs$core$IFn$_invoke$arity$variadic = (function (args) {
return cherry_core.apply.call(null, console.log, cherry_core.map.call(null, (function (_PERCENT_1) {
return cherry_core.clj__GT_js.call(null, _PERCENT_1);
}), args));
});
f18.cljs$lang$maxFixedArity = 0;
f18.cljs$lang$applyTo = (function (seq21) {
const self__22529__auto__6 = this;
return self__22529__auto__6.cljs$core$IFn$_invoke$arity$variadic(cherry_core.seq.call(null, seq21));
});
return f18;
})();
var subscribe_endpoint = cherry_core.str.call(null, custom_domain, "/.netlify/functions/subscribe");
var subscribe = (async function (email) {
const headers1 = cherry_core.array_map(cherry_core.keyword("method"), "POST", cherry_core.keyword("headers"), cherry_core.array_map("Content-Type", "application/json"), cherry_core.keyword("body"), JSON.stringify(cherry_core.clj__GT_js.call(null, cherry_core.array_map(cherry_core.keyword("email"), email))));
return (await (async () => {
try{
return (await fetch(subscribe_endpoint, cherry_core.clj__GT_js.call(null, headers1)));}
catch(e2){
console.error("Error:", e2);
return false;}

})());
});
var success_html = squint_html.html`<div>You are now subscribed to the mailing list. Thank you!</div>`;
var error_html = squint_html.html`<div><h3>Error</h3><p>Unfortunately it wasn't possible to subscribe to the mailing list. Please try again and if the problem persists, I'd really appreciate if you could let me know at <my-email></my-email></p></div>`;
var generate_submit_handler = (function (shadow_root) {
return function (event) {
event.preventDefault();
const form1 = event.target;
const flash_div2 = shadow_root.querySelector("#flash");
const spinner3 = shadow_root.querySelector("fa-icon");
spinner3.style.display = "inline-block";
return subscribe.call(null, form1.email.value).then((function (result) {
if (cherry_core.truth_.call(null, result)) {
flash_div2.classList.add("success");
flash_div2.innerHTML = success_html;
form1.style.display = "none";
form1.email.value = null;
} else {
flash_div2.classList.add("error");
flash_div2.innerHTML = error_html;
};
return spinner3.style.display = "none";
;
}));
};
});
var render = (function (_) {
return squint_html.tag`<link rel="stylesheet" href="/css/my-newsletter.css"><div id="newsletter"><h2>Subscribe to our newsletter!</h2><p id="tagline">Don't miss out on the latest tips. Be in the know.</p><fa-icon name="spinner" style="display: none"></fa-icon><div id="flash"></div><form><div style="display: flex"><input type="email" name="email" required="${squint_html.attr(true)}" placeholder="you@email.com"><button type="submit">Subscribe</button></div></form></div>`;
});
var setup = (function (component, shadow_root) {
const form1 = shadow_root.querySelector("form");
return form1.addEventListener("submit", generate_submit_handler.call(null, shadow_root));
});
class MyNewsletter extends HTMLElement {
  constructor() {
super();const self__ = this;
const this$ = this;
this$.attachShadow(cherry_core.js_obj.call(null, "mode", "open"))  }
connectedCallback() { 
const this$ = this;
const self__ = this;this$.shadowRoot.innerHTML = render.call(null, this$);
;
setup.call(null, this$, this$.shadowRoot);
return null;
}};
customElements.define("my-newsletter", MyNewsletter);

export { MyNewsletter, generate_submit_handler, error_html, success_html, setup, prn, subscribe_endpoint, render, subscribe }
