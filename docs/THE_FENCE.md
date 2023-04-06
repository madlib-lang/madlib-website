**The Fence** is our built-in escape hatch. While Madlib has a powerful type and inference system, "fenced" code allows you to drop down to any native JS construct. However, doing so will eschew any of the automatic type inference and instead treat code within the **The Fence** as opaque.

It has been a core feature of Madlib ideology from the very start of this project, as it can (if used *judiciously*) allow developers to build on top of existing JavaScript projects or allow for incremental migration to Madlib from JavaScript.

## Danger

Under the hood Madlib uses the fenced code liberally, but with type annotations, which allows us to build well-typed code on top of raw JavaScript. When writing code in Madlib, to take advantage of our powerful type system you should generally only use **The Fence** when absolutely necessary.


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
