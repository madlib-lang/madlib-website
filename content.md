# Madlib

![madlib logo](/assets/logo.svg)

> A compile-to-JS language designed to make writing code a **delight**

## A functional language with familiar syntax

Madlib is a pragmatic functional programming language which compiles to JavaScript.
It is similar in syntax to JavaScript (with a little bit of Haskell).
Madlib embraces function composition, automatic currying, and monadic control structures.

## Safety, Types and Pragmatism

Mutation is only possible in explicit safe places.
Madlib is powered by the [Hindley-Milner type system](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system), which means that it has powerful type inference and doesn't need annotations in most cases.
Madlib also allows for unsafe native JavaScript wrapped in "the fence", i.e. `#- Math.random() -#` which gives developers a potential escape hatch (but without type inference).

## Tooling

* Auto-generated documentation - powered by the rich type system
* VSCode language server - provides in-IDE feedback including real-time errors and type annotations for a faster development loop

## Libraries and Examples

* UI View library: build web apps in the browser
* Server: simple servers inspired by `express`
* [Parser library](https://madlib-lang.github.io/madparser): parse structured input with native Madlib
* Markdown parser: parse markdown input with native Madlib
