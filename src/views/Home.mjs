// file: /Users/brekk/work/madland/madlib-website/src/views/Home.mad
import { id, className, div, header, main, p, section, text } from "./Home.mjs/.deps/MadUI/src/Main.mjs";
import { renderMarkdown } from "./Home.mjs/.deps/MadMarkdownRenderer/src/Main.mjs";
import { strata } from "./Home.mjs/.deps/strata/src/Main.mjs";
import { Nav } from "./Nav.mjs";
import { Footer } from "./Footer.mjs";
import { LinkedHeader } from "./LinkedHeader.mjs";
import { slug } from "./../Utils.mjs";

let stratum = strata("website");
export let PageSection = (raw => {
    let clean = slug(raw.title);
    let sectionLinkProps = ({ id: clean, title: raw.title });
    return section(([id(clean), className(stratum.e('section'))]))(([LinkedHeader(sectionLinkProps), text(" "), p(([className(stratum.e('paragraph'))]))(([renderMarkdown(raw.content)]))]));
});
export let Home = (state => div(([className(stratum.e(''))]))(([Nav(state.content.nav), header(([className(stratum.e('header'))]))(([renderMarkdown(state.content.header.content)])), main(([className(stratum.e('main'))]))(([ ...Functor.List.map()(PageSection)(state.content.sections)])), Footer(state)])));
export default { PageSection, Home };
