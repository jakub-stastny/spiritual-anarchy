import * as cherry_core from 'cherry-cljs/cljs.core.js';
var component = (() => {
const f1 = (function (var_args) {
const args21 = cherry_core.array.call(null);
const len__22502__auto__2 = cherry_core.alength.call(null, arguments);
let i33 = 0;
while(true){
if ((i33) < (len__22502__auto__2)) {
args21.push((arguments[i33]));
let G__4 = (i33 + 1);
i33 = G__4;
continue;
};break;
}
;
const argseq__22661__auto__5 = ((5) < (cherry_core.alength.call(null, args21))) ? (new cherry_core.IndexedSeq(args21.slice(5), 0, null)) : (null);
return f1.cljs$core$IFn$_invoke$arity$variadic((arguments[0]), (arguments[1]), (arguments[2]), (arguments[3]), (arguments[4]), argseq__22661__auto__5);
});
f1.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form, _AMPERSAND_env, class_name, element_name, render_fn, setup_fns) {
return cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "do")), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "cherry.core/defclass")), cherry_core.list.call(null, class_name), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "extends")), cherry_core.list.call(null, cherry_core.symbol.call(null, "js/HTMLElement")))))), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "constructor")), cherry_core.list.call(null, cherry_core.vec.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "this"))))))), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "super")))))), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, ".attachShadow")), cherry_core.list.call(null, cherry_core.symbol.call(null, "this")), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "js-obj")), cherry_core.list.call(null, "mode"), cherry_core.list.call(null, "open"))))))))))))), cherry_core.list.call(null, cherry_core.symbol.call(null, "Object")), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "connectedCallback")), cherry_core.list.call(null, cherry_core.vec.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "this"))))))), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "set!")), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, ".-innerHTML")), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, ".-shadowRoot")), cherry_core.list.call(null, cherry_core.symbol.call(null, "this")))))))))), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, render_fn), cherry_core.list.call(null, cherry_core.symbol.call(null, "this")))))))))), cherry_core.map.call(null, (function (setup_fn) {
return cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, setup_fn), cherry_core.list.call(null, cherry_core.symbol.call(null, "this")), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, ".-shadowRoot")), cherry_core.list.call(null, cherry_core.symbol.call(null, "this")))))))));
}), setup_fns), cherry_core.list.call(null, null))))))))), cherry_core.list.call(null, cherry_core.sequence.call(null, cherry_core.seq.call(null, cherry_core.concat.call(null, cherry_core.list.call(null, cherry_core.symbol.call(null, "js/customElements.define")), cherry_core.list.call(null, element_name), cherry_core.list.call(null, class_name))))))));
});
f1.cljs$lang$maxFixedArity = 5;
f1.cljs$lang$applyTo = (function (seq4) {
const G__56 = cherry_core.first.call(null, seq4);
const seq47 = cherry_core.next.call(null, seq4);
const G__68 = cherry_core.first.call(null, seq47);
const seq49 = cherry_core.next.call(null, seq47);
const G__710 = cherry_core.first.call(null, seq49);
const seq411 = cherry_core.next.call(null, seq49);
const G__812 = cherry_core.first.call(null, seq411);
const seq413 = cherry_core.next.call(null, seq411);
const G__914 = cherry_core.first.call(null, seq413);
const seq415 = cherry_core.next.call(null, seq413);
const self__22528__auto__16 = this;
return self__22528__auto__16.cljs$core$IFn$_invoke$arity$variadic(G__56, G__68, G__710, G__812, G__914, seq415);
});
return f1;
})();

export { component }
