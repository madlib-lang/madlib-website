Here's a listing of several examples you can use to better understand idiomatic Madlib syntax and methodology.

## Strata

This is the entirety of the [Strata](https://github.com/madlib-lang/strata/blob/master/src/Main.mad) library (inlined for convenience) which is used for generating BEM syntax (and can be found on this site as well):

```madlib
import { concat } from "List"
import { join } from "String"
import { ifElse, always } from "Function"
import { join, isEmpty } from "String"
import { concat } from "List"

joint :: String -> String -> String -> String
export joint = (delimiter, left, right) =>
  ifElse(
    isEmpty,
    always(left),
    pipe(
      of,
      concat([left]),
      join(delimiter)
    )
  )(right)

blockElement :: String -> String -> String
export blockElement = (block, el) => joint("__", block, el)

blockModifier :: String -> String -> String
export blockModifier = (block, mod) => joint("--", block, mod)

blockModifiers :: String -> List String -> String
export blockModifiers = (block, mods) => pipe(
  map(blockModifier(block)),
  concat([block]),
  join(" ")
)(mods)

blockElementModifiers :: String -> String -> List String -> String
export blockElementModifiers = (block, el, mods) => pipe(
  blockElement($, el),
  blockModifiers($, mods)
)(block)

export strata = (b) => ({
  e: blockElement(b),
  em: blockElementModifiers(b),
  m: blockElementModifiers(b, "")
})
```

Try copying this into the playground below.

