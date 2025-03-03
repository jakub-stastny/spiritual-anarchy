import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as squint_html from 'squint-cljs/src/squint/html.js';
import { hiccup_to_node } from 'helpers';
var render = (function () {
return squint_html.html`<link rel="stylesheet" href="/css/fa-icon.css">`;
});
class FaIcon extends HTMLElement {
  constructor() {
super();const self__ = this;
const this$ = this;
this$.attachShadow(({ "mode": "open" }));
this$.shadowRoot.innerHTML = render.call(null);
  }
async connectedCallback() { 
const this$ = this;
const self__ = this;const name1 = this$.getAttribute("name");
const qualified_name2 = (cherry_core.truth_.call(null, name1.includes("/"))) ? (name1) : (cherry_core.str.call(null, "solid/", name1));
const path3 = cherry_core.str.call(null, "/svg/", qualified_name2, ".svg");
const response4 = (await fetch(path3));
const svg5 = (await response4.text());
const colour6 = this$.getAttribute("colour");
const svg_node7 = hiccup_to_node.call(null, svg5);
this$.shadowRoot.appendChild(svg_node7);
if (cherry_core.truth_.call(null, colour6)) {
const path_node8 = svg_node7.children[0];
return path_node8.setAttribute("fill", colour6);}
}};
customElements.define("fa-icon", FaIcon);

export { render, FaIcon }
