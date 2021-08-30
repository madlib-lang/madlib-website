// file: /Users/brekk/work/madland/madlib-website/src/views/Nav.mad
import { a, className, div, href, li, text, ul } from "./Nav.mjs/.deps/MadUI/src/Main.mjs";
import { strata } from "./Nav.mjs/.deps/strata/src/Main.mjs";

let stratum = strata('nav');
let NavLink = (s => li(([className(stratum.e('item'))]))(([a(([href(s.href)]))(([text(s.text)]))])));
export let Nav = (s => div(([className(stratum.e(''))]))(([ul(([className(stratum.e('list'))]))(([ ...Functor.List.map()(NavLink)(s)]))])));
export default { Nav };
