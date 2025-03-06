import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as squint_html from 'squint-cljs/src/squint/html.js';
import { no_self_referring_link } from 'helpers';
var render = (function (_) {
return squint_html.tag`<link rel="stylesheet" href="/css/my-header.css"><header><div class="wrapper" style="opacity: 0;"></div><h1>${no_self_referring_link.call(null, "Spiritual anarchy", "/")}</h1><h2 class="tagline">The guru is within. Learn to trust it.</h2></header>`;
});
class MyHeader extends HTMLElement {
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
customElements.define("my-header", MyHeader);

export { render, MyHeader }
