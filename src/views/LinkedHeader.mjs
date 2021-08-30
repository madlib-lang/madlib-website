// file: /Users/brekk/work/madland/madlib-website/src/views/LinkedHeader.mad
import { strata } from "./LinkedHeader.mjs/.deps/strata/src/Main.mjs";
import { h2, className, a, href, span, text } from "./LinkedHeader.mjs/.deps/MadUI/src/Main.mjs";

let stratum = strata('linked-section');
export let LinkedHeader = (raw => h2(([className(stratum.e(''))]))(([a(([href(`#${raw.id}`), className(stratum.e('link'))]))(([text("#")])), span(([className(stratum.e('title'))]))(([text(raw.title)]))])));
export default { LinkedHeader };
