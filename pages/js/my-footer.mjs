import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as squint_html from 'squint-cljs/src/squint/html.js';
import { css_var } from 'helpers';
import("/js/fa-icon.mjs");
import("/js/my-email.mjs");
var social_icon = (function (name, link) {
return squint_html.tag`<a href="${squint_html.attr(link)}" target="_blank" rel="noopener"><fa-icon name="${squint_html.attr(cherry_core.str.call(null, "brands/", name))}" colour="${squint_html.attr(css_var.call(null, cherry_core.str.call(null, name, "-colour")))}"></fa-icon></a>`;
});
var render_footer = (function () {
return squint_html.tag`<ul class="footer-icons"><li>${social_icon.call(null, "youtube", youtube_link)}</li><li><my-email subject="Hey there!"><a><fa-icon name="envelope" colour="${squint_html.attr(css_var.call(null, "envelope-colour"))}"></fa-icon></a></my-email></li><li>${social_icon.call(null, "reddit", reddit_link)}</li></ul>`;
});
var render = (function (_) {
return squint_html.html`<link rel="stylesheet" href="/css/my-footer.css"><footer>&nbsp;</footer>`;
});
class MyFooter extends HTMLElement {
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
customElements.define("my-footer", MyFooter);

export { social_icon, render_footer, render, MyFooter }
