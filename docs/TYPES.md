In Madlib there are two ways to provide type annotation. You can annotate a function assignment or an inline expression.

### Function types
Function types are declared as follows:
```madlib
myFunction :: a -> b -> c
```
This indicates that there is a function named `myFunction` which takes two parameters of two different types, `a` and `b`. And it then returns a value of type `c`.

In a more concrete example, we could type a function that produces the sum of two integers like so:
```
sum :: Integer -> Integer -> Integer
```

### Type variables

```madlib
stringJoin :: String -> a -> String
```
Madlib types (also known as [Hindley-Milner types](https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system)) allow for completeness and type inference. (Unlike some languages you might have worked with, if the Madlib compiler says its wrong, you can trust that it's actually wrong.) These signatures allow for generic or indefinite types. They are represented with lowercased words, often even single lower cased characters. In the example above, we have an indefinite type `a` which can be anything.

**NB**: All type variables can only instantiate with the same type. So in the function:
```madlib
identity :: a -> a
identity = (x) => x
```
The two `a` variables will always be the same concrete type when called. So `identity(3.3)` will always return a `Float` because it is called with a `Float`.

#### Applying a type variable
The type `List` is "incomplete". In order for a `List` to be considered "complete" it must be applied with a concrete type. For example, a list of integers is defined as: `List Integer`. It is also possible to apply a type variable to it, so that we have a list of "whatever", e.g. `List a`

For a more concrete example, this is how `concat` (a function which combines two lists) from our standard library is typed:
```madlib
concat :: List a -> List a -> List a
```

### Constraints
Analogous to Haskell type classes, Madlib has [interfaces](/docs/interfaces). For example, the standard library includes the `Inspect` interface, which has one method, `inspect`. If you wanted to have a function which uses it, perhaps something like:
```madlib
pushAndLog = (item, list) => {
  IO.putLine(inspect(item))
  return [item, ...list]
}
```
The type of the above function would need to be the following:
`pushAndLog :: a -> List a -> List a`

**However!** Because `inspect` is called on the parameter `item` (type `a`), there's a missing constraint. The fact that we call a method on that item implies that the type `a` must be a type that implements `Inspect` (sometimes this is called a "constraint").

Therefore, the correct type definition of `pushAndLog` is instead:
```madlib
pushAndLog :: Inspect a => a -> List a -> List a
pushAndLog = (item, list) => {
  IO.putLine(inspect(item))
  return [item, ...list]
}
```

A type annotation with constraints takes this form: `constraints => type` where `constraints` are in the shape of `Interface typeVar` or in the case of multiple constraints: `(Interface typeVar, OtherInterface otherVar)`. **NB**: Note the difference between the previously used type constructor `->` and this "fat" arrow used to indicate the constraint: `=>`

Additionally, be aware that a type variable can have multiple constraints, for example:
```madlib
// for reference IO.log has type:
// Inspect a => a -> {}

sumAndLog :: (Number a, Inspect a) => a -> a -> a
sumAndLog = (a, b) => {
  result = a + b
  IO.log(result)
  return result
}
```
This `sumAndLong` function can deal with integers, floating point numbers and bytes as a result of this constraint.

### Function annotations
We can bind type definitions to concrete implementations with the `::` syntax:
```madlib
glue :: String -> String -> String
glue = (a, b) => `${a}:${b}`
```

This can also be applied to any assignment in the same manner:
```madlib
SERVER_URL :: String
SERVER_URL = "https://myserver.tld"
```

### Expression annotations
We can bind type definitions to expressions inline like so:
```madlib
(expression :: type)
```
**NB**: Note, to avoid ambiguity, the parentheses when defining inline annotations are always necessary. This is designed to avoid this otherwise confusing case:
~~`1 + 3 :: Float`~~
Are we annotating `3` or `1 + 3`?

## Built-in types

### Integer
### with JS backend
Integers are represented as JS number.

#### with LLVM backend
Integers are represented as 64 bit signed numbers.

#### Examples
```madlib
1
-1
2384933
```

### Float
#### with JS backend
Floats are represented as JS number.

#### with LLVM backend
Floats are encoded as IEEE 754.

#### Examples
```madlib
1.3
-1.3
138.75
```

### Byte
#### with JS backend
Bytes are represented as JS numbers.

#### with LLVM backend
Bytes are 8-bit unsigned numbers.

#### Examples
```madlib
(1 :: Byte)
(255 :: Byte)
```
**NB:** Note that we have to use this expression annotation above in order to tell the compiler that we're not talking about Integers.

### Number interface
The `Number` `interface` defines operations that can be used with numbers. It is implemented for the following types:
- Integer
- Float
- Byte

Infix methods of Number:
- `+`
- `-`
- `*`
- `>`
- `<`
- `>=`
- `<=`

The default instance for Number is Integer. So if we're faced with an ambiguous instance, it resolves to Integer automatically except if a type annotation forces another type. This is why the inline annotations are needed for `Byte` expressions, above.

### String
A list of characters

#### Examples
```madlib
"Hello World"
`Hello World`
```
**NB:** Note that single-quote wrapped literals are parsed as Chars, not Strings!

### Char
The constituent parts of Strings

#### Examples
```madlib
'a'
'\n'
```

### Boolean
A value that can be `true` or `false`

#### Examples
```madlib
true
false
```

### Unit
The unit type in Madlib is seen as the empty record.
The type and the value are represented by the same characters: `{}`.

#### Examples
```madlib
{}
```

### List
#### Examples
```madlib
numbers = [4, 5, 6]
[1, 2, 3, ...numbers] // [1, 2, 3, 4, 5, 6]
[true, false, false]
[{}, {}, {}, {}]
```
Note: Lists in Madlib must have unified types. If you wanted to have a list of disparate types, you'd need to have some intermediate wrapper value.

### Dictionary
Dictionary is a key/value collection. A given key can only be present once in the collection. A key can be any type that implements the `Comparable` interface.

#### Examples
```madlib
{{ "key": "value" }}
```

### Set
Set is a collection similar to List, but all contained items are unique and ordered. Only values of types implementing Comparable can be part of a Set. There is no built-in syntax sugar for Set like there is for List or Dictionary. So you must use the constructor from the Set module of the standard library.

#### Examples
```madlib
import Set from "Set"
Set.fromList([1, 2, 3])
```

### Tuples
A tuple is a n-dimension grouping of values. It is analog to vector and can in fact be used to describe vectors or similar thing, but also to group things. As a matter of a fact, the Dictionary constructor `fromList` accepts a List of 2-tuples `#[key, value]`.
The type is represented like this: `#[type1, type2, ...typeN]`.

#### Examples
Tuple syntax is as follows:
```madlib
#[1, 2, 3]
#["a string", true, {}, {{ "key": "value" }}]
```

### ByteArray
A ByteArray is an array of Byte. It can be used to represent any byte sequence such as binary file content, image data, or pretty much anything as raw bytes. Like Set it does not have any special syntax but a few handy constructors and conversion functions such as: `fromList`, `toList`, `fromString`, `toString`.

#### Examples
```madlib
import ByteArray from "ByteArray"

ByteArray.fromList([50, 100, 150])
ByteArray.fromString("Hello")
```

### Array
Array offers a similar functionality as List but the internals are very much different. It is represented by arrays in JS and as a contiguous set of items in memory with the llvm backend. It is more efficient to push items at the end of an array or concatenate two arrays than lists, but it is more efficient to push items in front of a list. Other than that most functions for lists have their array equivalent such as `map`, `filter`, `reduce`.

#### Examples
```madlib
import Array from "Array"

Array.fromList([1, 2, 3])
```
