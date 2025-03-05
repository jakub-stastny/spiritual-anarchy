import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as squint_html from 'squint-cljs/src/squint/html.js';
var render = (function (component) {
const donation1 = (() => {
const or__23477__auto__2 = component.getAttribute("donation");
if (cherry_core.truth_.call(null, or__23477__auto__2)) {
return or__23477__auto__2;} else {
return 100;}
})();
const duration3 = (() => {
const or__23477__auto__4 = component.getAttribute("duration");
if (cherry_core.truth_.call(null, or__23477__auto__4)) {
return or__23477__auto__4;} else {
return "1 hour";}
})();
const styles5 = (() => {
const or__23477__auto__6 = component.getAttribute("style");
if (cherry_core.truth_.call(null, or__23477__auto__6)) {
return or__23477__auto__6;} else {
return cherry_core.array_map();}
})();
return squint_html.tag`<link rel="stylesheet" href="/css/service-info.css"><p id="details" style="${squint_html.attr(styles5)}"><strong>Suggested donation: </strong>${cherry_core.str.call(null, "$", donation1)}, <strong>duration: </strong>${cherry_core.str.call(null, duration3, ".")}</p>`;
});
class ServiceInfo extends HTMLElement {
  constructor() {
super();const self__ = this;
const this$ = this;
this$.attachShadow(cherry_core.js_obj.call(null, "mode", "open"))  }
connectedCallback() { 
const this$ = this;
const self__ = this;this$.shadowRoot.innerHTML = render.call(null, this$);
;
return null;
}};
customElements.define("service-info", ServiceInfo);

export { render, ServiceInfo }
