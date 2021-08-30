// file: /Users/brekk/work/madland/madlib-website/src/Parsers.mad
import { map1, map2, map4, list, field, string } from "./Parsers.mjs/.prelude/Json.mjs";

export let sectionParser = map2((title => content => ({ title: title, content: content })))(field("title")(string))(field("content")(string));
export let headerParser = map1((content => ({ content: content })))(field("content")(string));
export let navParser = map2((href => text => ({ text: text, href: href })))(field('href')(string))(field('text')(string));
export let contentParser = map4((title => headerContent => nav => sections => ({ title: title, header: headerContent, sections: sections, nav: nav })))(field("title")(string))(field("header")(headerParser))(field("nav")(list(navParser)))(field("sections")(list(sectionParser)));
export default { sectionParser, headerParser, navParser, contentParser };
