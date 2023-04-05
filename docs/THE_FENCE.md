**The Fence** is a syntactic construct which allows you to write any valid JavaScript within Madlib transparently, at the cost of automatic type inference. It was a core feature of Madlib ideology from the very start of this project, as it allows for an escape hatch that (if used *judiciously*) can allow developers to build on top of existing JavaScript projects or allow for incremental migration to Madlib from JavaScript.

## Syntax

If you want to do something in Madlib which is not yet expressible in the current native Madlib syntax, you can wrap any valid JS expression with either the single-line fence pair (`#-` / `-#`), e.g.:
```madlib
cool = `Madlib can use raw JS if you _really_ need to.`
#- console.log(cool) -#
```

Or a multi-line fence pair (`#- {` / `} -#`), e.g.

```madlib
decode :: String -> Maybe String
export decode = (url) => #- {
  try {
    return Just(decodeURIComponent(url))
  } catch(e) {
    return Nothing
  }
} -#
```

## Danger

It is important to note that usage of **The Fence** without proper typing (as above, adding a type definition will ensure the compiler is satisfied) will likely break things in your Madlib program. However, parts of the core Madlib [standard library](/docs/stdlib) are still built on top of **The Fence** today, it allows us to iterate and take advantage of the extant `node` / `npm` ecosystem easily.

## Utilities

Madlib programs have good interoperability between Madlib and JavaScript (when targeting JS environments), but it is important to know of a few utilities if you need to use this feature:

### __listToJSArray__

Convert a Madlib List to a JS Array

```madlib
a = ["one", "two", "three"]
#- console.log(__listToJSArray__(a)) -#
```

### __jsArrayToList__

Convert a JS Array to a Madlib List

```madlib
list = #- {
  const a = ["one", "two", "three"]
  a.push("four")
  return __listToJSArray__(a)
} -#
```
