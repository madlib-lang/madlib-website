### Automatic Currying

Madlib functions are automatically curried, so something such as:
```madlib
product :: Integer -> Integer -> Integer
product = (a, b) => a * b
```
Can be partially applied and named, so you can have a morphism like `double`:
```madlib
double = sum(2)
```

### Composition

Madlib provides the `pipe` composition function, which composes functions left-to-right:
```madlib
pipe(
  product(2),
  product(10)
)(40) // 800
```

Additionally, there is an equivalent infix operator, `|>` which works similarly:
```madlib
40 |> product(2) |> product(10)
```
