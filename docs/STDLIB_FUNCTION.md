### `Function.complement`

> `Function.complement :: (a -> Boolean) -> a -> Boolean`

Given a predicate function, produce a function which has the opposite predicate

```madlib
import IO from "IO"
import String from "String"
import { complement } from "Function"

main = () => {
  pipe(
    map(complement(String.includes('z'))),
    IO.trace("output")
  )(["alpha", "zero"])
}
```

### `Function.always`

> `Function.always :: a -> b -> a`

Always return the first supplied parameter no matter what

```madlib
import IO from "IO"
import String from "String"
import { always } from "Function"

main = () => {
  pipe(
    always("no"),
    IO.trace("output")
  )(["alpha", "zero"])
}
```

### `Function.identity`

> `Function.identity :: a -> a`

Returns what it is given

```madlib
import IO from "IO"
import String from "String"
import { identity } from "Function"

main = () => {
  pipe(
    identity,
    IO.trace("output")
  )(["alpha", "zero"])
}
```

### `Function.equals`

> `Function.equals :: Eq a => a -> a -> Boolean`

Equality comparison as a function

```madlib
import IO from "IO"
import String from "String"
import List from "List"
import { equals } from "Function"

main = () => {
  pipe(
    List.filter(equals("alpha")),
    IO.trace("output")
  )(["alpha", "zero"])
}
```

### `Function.notEquals`

> `Function.notEquals :: Eq a => a -> a -> Boolean`

Inequality comparison as a function

```madlib
import IO from "IO"
import String from "String"
import List from "List"
import { notEquals } from "Function"

main = () => {
  pipe(
    List.filter(notEquals("alpha")),
    IO.trace("output")
  )(["alpha", "zero"])
}
```

### `Function.ifElse`

> `Function.ifElse :: (a -> Boolean) -> (a -> b) -> (a -> b) -> a -> b`

Ternary function which represents conditional logic by taking a predicate function and two transformer functions.

```madlib
import IO from "IO"
import String from "String"
import { ifElse, identity } from "Function"

main = () => {
  pipe(
    ifElse(
      String.startsWith("m"),
      (x) => x ++ x,
      identity
    ),
    IO.trace("output")
  )("madlib")
}
```

### `Function.when`

> `Function.when :: (a -> Boolean) -> (a -> a) -> a -> a`

`ifElse` but with no else case

```madlib
import IO from "IO"
import String from "String"
import { when } from "Function"

main = () => {
  pipe(
    when(
      String.startsWith("m"),
      (x) => x ++ x,
    ),
    IO.trace("output")
  )("madlib")
}
```

### `Function.not`

> `Function.not :: Boolean -> Boolean`

Given a boolean, produce the complement value (`true` becomes `false` and vice-versa)

```madlib
import IO from "IO"
import String from "String"
import { when, not } from "Function"

main = () => {
  pipe(
    when(
      pipe(String.startsWith("m"), not),
      (x) => x ++ x,
    ),
    IO.trace("output")
  )("madlib")
}
```

### `Function.noop`

> `Function.noop :: a -> {}`

Given any value, return Unit `{}`

```madlib
import IO from "IO"
import String from "String"
import { noop } from "Function"

main = () => {
  pipe(
    noop,
    IO.trace("output")
  )("madlib")
}
```

### `Function.flip`

> `Function.flip :: (a -> b -> c) -> b -> a -> c`

Swaps the parameters of a binary function

```madlib
import IO from "IO"
import String from "String"
import { flip } from "Function"

prepend :: String -> String -> String
prepend = (a, b) => a ++ b

main = () => {
  pipe(
    flip(prepend)("hooray"),
    IO.trace("output")
  )("madlib")
}
```

### `Function.any`

> `Function.any :: (a -> Boolean) -> List a -> Boolean`

Given a predicate and a list, return true if the predicate matches anything

```madlib
import IO from "IO"
import String from "String"
import { any } from "Function"

prepend :: String -> String -> String
prepend = (a, b) => a ++ b

main = () => {
  pipe(
    any(String.startsWith("mad")),
    IO.trace("output")
  )(["madlib", "sadlib"])
}
```

### `Function.all`

> `Function.all :: (a -> Boolean) -> List a -> Boolean`

Given a predicate and a list, return true if the predicate matches everything

```madlib
import IO from "IO"
import String from "String"
import { all } from "Function"

prepend :: String -> String -> String
prepend = (a, b) => a ++ b

main = () => {
  pipe(
    all(String.startsWith("mad")),
    IO.trace("output")
  )(["madlib", "sadlib"])
}
```

### `Function.either`

> `Function.either :: (a -> Boolean) -> (a -> Boolean) -> a -> Boolean`

Functional "or": `either(() => true, () => false)`

```madlib
import IO from "IO"
import String from "String"
import { any, either } from "Function"

prepend :: String -> String -> String
prepend = (a, b) => a ++ b

main = () => {
  pipe(
    any(either(
      String.startsWith("bad"),
      String.startsWith("dad")
    )),
    IO.trace("output")
  )(["madlib", "sadlib"])
}
```

### `Function.both`

> `Function.both :: (a -> Boolean) -> (a -> Boolean) -> a -> Boolean`

Functional "and": `both(() => true, () => false)`

```madlib
import IO from "IO"
import String from "String"
import List from "List"
import { both } from "Function"

prepend :: String -> String -> String
prepend = (a, b) => a ++ b

main = () => {
  pipe(
    List.filter(
      both(
        String.startsWith("mad"),
        String.endsWith("lib")
      )
    ),
    IO.trace("output")
  )(["madlib", "sadlib", "radlib"])
}
```
