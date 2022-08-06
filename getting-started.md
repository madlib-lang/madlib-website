*Madlib* is a hybrid language which is a combination of [JavaScript](https://www.javascript.com) and [Haskell](https://www.haskell.org/). It is similar in nature to [PureScript](https://www.purescript.org/), [ReasonML](https://reasonml.github.io) and [Elm](https://elm-lang.org/).

*Madlib* takes inspiration from the “Good Stuff” and builds a more functional foundation atop it.

```
import IO from 'IO'
hello = (greetee) => IO.log(`Hello ${greetee}`)

hello('World')
```

# Table of Contents

* The Fence
* Variables
* Types
* Comments

## The Fence

The _"Fence"_ is our built-in escape hatch. While *Madlib* has a powerful type and inference system, the _Fence_ allows you to drop down to any native JS construct. However, doing so will eschew any of the type inference and instead treat code within the _Fence_ as opaque.

```
rand = () => #- Math.random() -#
```

Under the hood *Madlib* uses the _Fence_ liberally, but with type annotations, which allows us to build well-typed code but on top of raw JavaScript. When writing code in *Madlib*, to take advantage of our powerful type system you should generally only use the _Fence_ when absolutely necessary. Additionally, if using the _Fence_, we recommend adding type annotations (which are normally not needed) in order to guide the compiler.

## Variables

For those coming from JavaScript, you'll find that *Madlib*'s syntax is very familiar. All data in *Madlib* is immutable. Instead of the differing semantics of `var` / `let` / `const`, in *Madlib* one simply defines values via the assignment operator (`=`).

```
x = 100
y = x + 1
user = { name: "Arnaud" }
```

## Expressions

All expressions in *Madlib* _must_ return a value. Neither `null` nor `undefined` is a valid keyword.

```
x + 1
1
"Hello world"
```

## Comparison operators

Unlike JavaScript's equality operators which are coercive, there is no strict equality comparison operator (`===`) in *Madlib*. Instead we have the equality operator `==` and an `equals` function. Both behave just like the strict equality operator of JavaScript.

## Literals

Base literals are identical to JavaScript. 

```
// boolean literals
yes = true
nope = false

// number literals
pi = 3.1415
two = 2
hex = 0xff0000

// string literals
roman = 'CDXX'
english = "four hundred and twenty"
french = `quatre cent vingt`
```

## Comments

Just like in JavaScript, we use `//` for single line comments and `/* ... */` for block comments.

```
// Cool!
x = 100 /* x is one hundred */
```

## Functions

Functions are at the heart of *Madlib*.

1. A function is an expression which can be (re-)evaluated given contextual parameters.
2. A function *must* always return a value.
3. A function may only define a single expression.
4. A multi-parameter function is automatically curried and can be partially applied without any special syntax.

### Defining a function

A function is identified by the arrow operator (`=>`). For those coming from JavaScript, the core behavior is identical to a "fat arrow" function.

```
// here we're defining a function called 'increment' which takes a value and adds 1 to it
increment = (x) => x + 1
```

### Typing a function

A function may be optionally typed with the has-type definition operator (`::`). After the type definition operator, you must provide all of the types of given parameters, as well as the return type, separated by the function type constructor (`->`).

```
// increment takes a number and returns a number
increment :: Number -> Number
increment = (x) => x + 1
```

### Invoking a function

Identically to JavaScript, a function is invoked by writing its name followed by parentheses and optional parameters to apply.

```
inc(3) // 2 + 1
```

### Composing functions

Use the pipeline operator (`|>`) to apply values or compose functions from left-to-right / top-to-bottom.

```
3 |> inc // 4
// equivalent to
inc(3)   // 4

3 |> inc |> inc // 5
// equivalent to
inc(inc(3))     // 5
```

Use the `pipe` keyword to create a composed unary function. Again, applied from left-to-right / top-to-bottom.

```
compute :: Number -> Number
compute = pipe(
  inc,
  add(10),
  divide(2)
)
compute(5) // 8

// equivalent to
divide(2)(add(10)(inc(5)))

// or with the pipeline operator
5 |> inc |> add(10) |> divide(2)
/*
(5 +   1  +     10)  /        2
*/
```

## Currying

All functions in *Madlib* are automatically curried and all greater-than-unary functions can be partially applied.

```
// 'add' takes two numbers and returns their sum
add :: Number -> Number -> Number
add = (b, a) => a + b

// we can now define 'inc' like this instead (and no type annotation is needed)
inc = add(1)
```

## Conditionals

*Madlib* supports `if` and `else`, but the `else` case is mandatory as [all expressions must return a value](#expressions).Additionally, these constructs implicitly return without the need for an explicit `return` keyword.

```
if (a % 2 == 0) { "even" } else { "odd" }
// shorthand / braceless form
if (a % 2 == 0) "even" else "odd"
```
Because this construct is an expression, it can also be assigned (`=`) to a value:
```
x = (if (a % 2 == 0) "even" else "odd")
```

Identically to JavaScript, *Madlib* also supports the ternary operator:
```
x = (a % 2 == 0 ? "even" : "odd")
```

*Madlib* also supports a syntactic sugar for dealing with [Monads](#monads):
```
where(given) {
  Just (x) => x
  Nothing => "Mistake"
}
```

Please see the [Monad](#monads) section for more details.
