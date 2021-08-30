// file: /Users/brekk/work/madland/madlib-website/src/views/SplashScreen.mad
import { className, div, img, onTransitionEnd, src, syncAction } from "./SplashScreen.mjs/.deps/MadUI/src/Main.mjs";
import { always, equals, ifElse } from "./SplashScreen.mjs/.prelude/Function.mjs";
import { strata } from "./SplashScreen.mjs/.deps/strata/src/Main.mjs";
import { Ready, Transitioning } from "./../Types.mjs";

let stratum = strata('splash-screen');
let handleTransitionEnd = syncAction((s => _ => ({ ...s, loadingState: Ready })));
export let SplashScreen = (_P_ => (logoClassName => div(([className(stratum.e(""))]))(([img(([className(logoClassName), src("/assets/logo.svg"), onTransitionEnd(handleTransitionEnd)]))(([]))])))(ifElse(equals(Transitioning))(always(stratum.em("logo")((["transitioning"]))))(always(stratum.e("logo")))(_P_)));
export default { SplashScreen };
