// file: /Users/brekk/work/madland/madlib-website/src/Core.mad
import { parse } from "./Core.mjs/.prelude/Json.mjs";
import { Left, Right } from "./Core.mjs/.prelude/Either.mjs";
import {  } from "./Core.mjs/.prelude/List.mjs";
import { get, Response } from "./Core.mjs/.prelude/Http.mjs";
import { fulfill } from "./Core.mjs/.prelude/Wish.mjs";
import { TextData } from "./Core.mjs/.prelude/Data.mjs";
import IO from "./Core.mjs/.prelude/IO.mjs";
import { Transitioning, Loading } from "./Types.mjs";
import { contentParser } from "./Parsers.mjs";
import { SplashScreen } from "./views/SplashScreen.mjs";

export let DEFAULT_CONTENT = ({ title: "Madlib", header: ({ content: "" }), nav: ([]), sections: ([]) });
export let INITIAL_STATE = ({ content: DEFAULT_CONTENT, loadingState: Loading });
export let RenderPage = (ToRender => state => (__eq__(state.loadingState, Loading) || __eq__(state.loadingState, Transitioning) ? SplashScreen(state.loadingState) : ToRender(state)));
export let loadContentSub = (dispatch => (_P_ => fulfill(IO.log)((_P_ => (c => dispatch((s => ({ ...s, content: c, loadingState: Transitioning }))))(IO.trace("content")(_P_))))(Functor.Wish.map()((__x__ => ((__x__) => {
  if (__x__.__constructor === "Right" && true) {
    let c = __x__.__args[0];
    return c;
  }
  else if (__x__.__constructor === "Left" && true) {
    return DEFAULT_CONTENT;
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(__x__)))(Functor.Wish.map()((__x__ => ((__x__) => {
  if (__x__.__constructor === "Response" && __x__.__args[0].data.__constructor === "TextData" && true) {
    let { data: { __args: [t] } } = __x__.__args[0];
    return parse(contentParser)(t);
  }
  else {
    console.log('non exhaustive patterns for value: ', __x__.toString()); 
    console.trace(); 
    throw 'non exhaustive patterns!';
  }
})(__x__)))(get(_P_)))))("/content.json"));
export default { DEFAULT_CONTENT, INITIAL_STATE, RenderPage, loadContentSub };
