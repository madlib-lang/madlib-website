### `IO.log`

> `IO.log :: Inspect a => a -> {}`

Write a Madlib value to `stdout` / `console.log` (depending on environment)

```madlib
import IO from "IO"

main = () => IO.log("Hey, cool!")
```

### `IO.trace`

> `IO.trace :: Inspect a => String -> a -> a`

Useful pipe inspector utility, `trace` takes a String and anything and prints them, returning the latter

```madlib
import IO from "IO"

main = () => {
  pipe(
    IO.trace("input"),
    (x) => x * 2,
    IO.trace("output")
  )(2)
}
```
