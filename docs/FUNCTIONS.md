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

### Placeholder Arguments

Because functions are automatically curried, we can use the `$` constant to introduce a "placeholder" argument:

```madlib
fraction :: Float -> Float -> Float
fraction = (a, b) => a / b
```

This function is a little hard-to-work-with as written, because the first parameter is the numerator. We can easily make this more palatable (without changing the original implementation) by using a placeholder:

```madlib
half = fraction($, 2.0)
```
Now we have a function which only applies the `b` parameter and still expects the `a` parameter.

### Pipe Composition

Madlib provides the `pipe` composition function, which composes functions left-to-right:

```madlib
pipe(
  product(2),
  product(10)
)(40) // 800
```

### Composition Operator

Additionally, there is an equivalent infix operator, `|>` which works similarly:

```madlib
40 |> product(2) |> product(10)
```
