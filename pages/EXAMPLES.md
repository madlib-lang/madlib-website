Here's a listing of several examples you can use to better understand idiomatic Madlib syntax and methodology.

*We're working on making this page have more clickable examples, please bear with us!*

## Maybe

Here are several variations of `Maybe` usage which are equivalent in behavior:

```madlib
import type { Maybe } from "Maybe"
import { Just, Nothing } from "Maybe"
import IO from "IO"

main = () => {
  x = Just({name: "Brekk"})
  pipe(
    where {
      Just(z) => "Hello " ++ z.name ++ "!"
      Nothing => "Hey there"
    },
    IO.trace("OUTPUT")
  )(x)
}
```

```madlib
import type { Maybe } from "Maybe"
import { fromMaybe, Just } from "Maybe"
import IO from "IO"

main = () => {
  x = Just({name: "Brekk"})
  pipe(
    map((z) => "Hello " ++ z.name),
    fromMaybe("Hey there"),
    IO.trace("OUTPUT")
  )(x)
}
```

```madlib
import type { Maybe } from "Maybe"
import { fromMaybe, Just } from "Maybe"
import IO from "IO"

prepend :: String -> String -> String
prepend = (pre, post) => pre ++ post

main = () => {
  x = Just({name: "Brekk"})
  pipe(
    map(.name),
    map(prepend("Hello ")),
    fromMaybe("Hey there"),
    IO.trace("OUTPUT")
  )(x)
}
```
