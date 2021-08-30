// file: /Users/brekk/work/madland/madlib-website/src/views/Footer.mad
import { strata } from "./Footer.mjs/.deps/strata/src/Main.mjs";
import { a, text, href, footer, className, span } from "./Footer.mjs/.deps/MadUI/src/Main.mjs";

let stratum = strata('footer');
export let Footer = (state => footer(([className(stratum.e(''))]))(([span(([className(stratum.e('power'))]))(([text("This site powered by "), a(([href("https://github.com/madlib-lang/madlib-website"), className(stratum.e('link'))]))(([text("Madlib")]))]))])));
export default { Footer };
