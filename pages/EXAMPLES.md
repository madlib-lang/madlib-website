Here's a listing of several examples you can use to better understand idiomatic Madlib syntax and methodology.

## Maybe

```madlib
import type { Maybe } from "Maybe"
import { Just, Nothing } from "Maybe"

main = () => {
  x = Just({name: "Brekk"})
  pipe(
    where {
      Just(z) => "Hello " ++ z.name ++ "!"
      Nothing => "Hey there"
    }
  )(x)
}
```

