import * as cherry_core from 'cherry-cljs/cljs.core.js';
import * as os from 'os';
import * as all_axios from 'axios';
var axios = all_axios.default;
var api_token = process.env.MAILER_LITE_API_TOKEN;
var group_id = "129574750637787099";
var headers = cherry_core.array_map("Content-Type", "application/json", "Accept", "application/json", "Authorization", cherry_core.str.call(null, "Bearer ", api_token));
var endpoint = (function (path) {
return cherry_core.str.call(null, "https://connect.mailerlite.com/api", path);
});
if (cherry_core.truth_.call(null, api_token)) {
} else {
console.error("Please set MAILER_LITE_API_TOKEN.");
process.exit(1)};
var parse_json = (function (body) {
return (() => {
try{
return cherry_core.vector(null, cherry_core.js__GT_clj.call(null, JSON.parse(body), cherry_core.keyword("keywordize-keys"), true));}
catch(error1){
console.log("ERROR", error1);
return cherry_core.vector(error1, null);}

})();
});
var to_json = (function (message) {
return cherry_core.str.call(null, JSON.stringify(({ "message": message }), null, 2), "\n");
});
var response = (() => {
const f1 = (function (var_args) {
const G__41 = cherry_core.alength.call(null, arguments);
switch (G__41) {case 2:
return f1.cljs$core$IFn$_invoke$arity$2((arguments[0]), (arguments[1]));
break;
case 3:
return f1.cljs$core$IFn$_invoke$arity$3((arguments[0]), (arguments[1]), (arguments[2]));
break;
default:
throw new Error(cherry_core.str.call(null, "Invalid arity: ", cherry_core.alength.call(null, arguments)))}
});
f1.cljs$core$IFn$_invoke$arity$2 = (function (status, body) {
return response.call(null, status, body, cherry_core.array_map());
});
f1.cljs$core$IFn$_invoke$arity$3 = (function (status, body, headers) {
const cors_headers3 = cherry_core.array_map("Access-Control-Allow-Origin", "*", "Access-Control-Allow-Headers", "Content-Type", "Access-Control-Allow-Methods", "HEAD, POST, OPTIONS");
return ({ "statusCode": status, "body": to_json.call(null, body), "headers": cherry_core.clj__GT_js.call(null, cherry_core.merge.call(null, cors_headers3, headers)) });
});
f1.cljs$lang$maxFixedArity = 3;
return f1;
})();
var subscribe = (async function (email) {
console.log(cherry_core.str.call(null, "Subscribing ", email, "."));
return (await (async () => {
try{
const data1 = cherry_core.array_map(cherry_core.keyword("email"), email, cherry_core.keyword("groups"), cherry_core.vector(group_id));
const options2 = cherry_core.array_map(cherry_core.keyword("headers"), headers);
const api_response3 = (await axios.post(endpoint.call(null, "/subscribers"), cherry_core.clj__GT_js.call(null, data1), cherry_core.clj__GT_js.call(null, options2)));
return response.call(null, 204, "");}
catch(error4){
console.log(cherry_core.str.call(null, "Error when subscribing ", email));
console.log(error4);
return response.call(null, 400, cherry_core.str.call(null, error4));}

})());
});
var handle_post = (async function (event, context) {
const vec__51 = parse_json.call(null, event.body);
const error2 = cherry_core.nth.call(null, vec__51, 0, null);
const data3 = cherry_core.nth.call(null, vec__51, 1, null);
console.log("handle-post", error2, cherry_core.clj__GT_js.call(null, data3));
if (cherry_core.truth_.call(null, error2)) {
return response.call(null, 400, cherry_core.ex_info.call(null, error2));} else {
if (cherry_core.truth_.call(null, cherry_core.contains_QMARK_.call(null, data3, cherry_core.keyword("email")))) {
return (await subscribe.call(null, cherry_core.keyword("email").call(null, data3)));} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return response.call(null, 400, "Validation error: key 'email' is missing.");} else {
return null;}}}
});
var dbg = (function (event, context, fun) {
const result1 = fun.call(null, event, context);
console.log("Response", result1);
return result1;
});
var handler = (async function (event, context) {
console.log("handler");
return dbg.call(null, event, context, (function (event, context) {
const method1 = event.httpMethod;
if (cherry_core.truth_.call(null, cherry_core._EQ_.call(null, method1, "POST"))) {
return handle_post.call(null, event, context);} else {
if (cherry_core.truth_.call(null, cherry_core._EQ_.call(null, method1, "HEAD"))) {
return response.call(null, 201, "");} else {
if (cherry_core.truth_.call(null, cherry_core._EQ_.call(null, method1, "OPTIONS"))) {
return response.call(null, 204, "", cherry_core.array_map("Allow", "HEAD, POST, OPTIONS"));} else {
if (cherry_core.truth_.call(null, cherry_core.keyword("else"))) {
return response.call(null, 405, "Method not allowed");} else {
return null;}}}}
}));
});
if (cherry_core.truth_.call(null, cherry_core._EQ_.call(null, os.platform(), "darwin"))) {
const args1 = cherry_core.drop.call(null, 4, cherry_core.js__GT_clj.call(null, process.argv));
if (cherry_core.truth_.call(null, cherry_core.empty_QMARK_.call(null, args1))) {
subscribe.call(null, "joe@gmail.com")} else {
let seq__82 = cherry_core.seq.call(null, args1);
let chunk__93 = null;
let count__104 = 0;
let i__115 = 0;
while(true){
if ((i__115) < (count__104)) {
const email6 = cherry_core._nth.call(null, chunk__93, i__115);
subscribe.call(null, email6);
let G__7 = seq__82;
let G__8 = chunk__93;
let G__9 = count__104;
let G__10 = cherry_core.unchecked_inc.call(null, i__115);
seq__82 = G__7;
chunk__93 = G__8;
count__104 = G__9;
i__115 = G__10;
continue;
} else {
const temp__23012__auto__11 = cherry_core.seq.call(null, seq__82);
if (cherry_core.truth_.call(null, temp__23012__auto__11)) {
const seq__812 = temp__23012__auto__11;
if (cherry_core.truth_.call(null, cherry_core.chunked_seq_QMARK_.call(null, seq__812))) {
const c__23227__auto__13 = cherry_core.chunk_first.call(null, seq__812);
let G__14 = cherry_core.chunk_rest.call(null, seq__812);
let G__15 = c__23227__auto__13;
let G__16 = cherry_core.count.call(null, c__23227__auto__13);
let G__17 = 0;
seq__82 = G__14;
chunk__93 = G__15;
count__104 = G__16;
i__115 = G__17;
continue;
} else {
const email18 = cherry_core.first.call(null, seq__812);
subscribe.call(null, email18);
let G__19 = cherry_core.next.call(null, seq__812);
let G__20 = null;
let G__21 = 0;
let G__22 = 0;
seq__82 = G__19;
chunk__93 = G__20;
count__104 = G__21;
i__115 = G__22;
continue;
}}};break;
}
}};

export { handler, dbg, axios, group_id, to_json, api_token, parse_json, endpoint, response, handle_post, subscribe, headers }
