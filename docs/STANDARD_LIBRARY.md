Madlib comes with a set of predefined functions in the form of our Standard Library.

(**NB**: Note that you can see it the raw library in code form [here](https://github.com/madlib-lang/madlib/tree/master/prelude/__internal__).)

Additionally, for an automatically generated version of the docs please go [here](https://madlib-lang.github.io/madlib).

The rest of this document will explore the most fundamental imports that the Standard Library provides:

### IO

#### log

Write a Madlib value to `stdout` / `console.log` (depending on environment)

```madlib
import IO from "IO

main = () => IO.log("Hey, cool!")
```

#### trace

Useful pipe inspector utility, `trace` takes a String and anything and prints them, returning the latter

```madlib
import IO from "IO

main = () => pipe(
  IO.trace("input"),
  (x) => x * 2,
  IO.trace("output")
)(2)
```

### String

#### toLower

Convert a string to lowercase

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.toLower,
  IO.trace("output")
)("Madlib Is Cool")
```

#### toUpper

Convert a string to uppercase


```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.toUpper,
  IO.trace("output")
)("Madlib Is Cool")
```


#### split

Split a string by another search string

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.toLower,
  String.split("i"),
  IO.trace("output")
)("Madlib Is Cool")
```

#### join

Join a string with a given delimiter string

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  map(String.toUpper),
  String.join(">> "),
  IO.trace("output")
)(["Madlib", "Is", "Cool"])
```

#### lines

Split a string by newlines

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.lines,
  IO.trace("output")
)(`’Twas brillig, and the slithy toves
Did gyre and gimble in the wabe:
All mimsy were the borogoves,
And the mome raths outgrabe.`)
```

#### unlines

Join a string by newlines

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.unlines,
  IO.trace("output")
)([
  "Beware the Jabberwock, my son!",
  "The jaws that bite, the claws that catch!",
  "Beware the Jubjub bird, and shun",
  "The frumious Bandersnatch!"
])
```

#### words

Split a string by spaces

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.words,
  IO.trace("output")
)(`He took his vorpal sword in hand;`)
```

#### unwords

Join a string by spaces

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.unwords,
  IO.trace("output")
)([
  "Long",
  "time",
  "the",
  "manxome",
  "foe",
  "he",
  "sought—"
])
```

#### toList

Convert a String to a List Char

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.toList,
  IO.trace("output")
)(`So rested he by the Tumtum tree`)
```

#### fromList

Convert a List Char to a String

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.fromList,
  IO.trace("output")
)(['A','n','d',' ',
's','t','o','o','d',
' ','a','w','h','i',
'l','e',' ','i','n',
' ','t','h','o','u',
'g','h','t','.'])
```

#### slice

Cut part of a string out of another string

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.slice(0, 6),
  IO.trace("output")
)("Madlib Is Cool")
```

#### isEmpty

Test whether a string is empty `""`

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  map(String.isEmpty),
  IO.trace("output")
)(["", ``, "test", " "])
```

#### drop

Drop a certain number of characters from the beginning of a string

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.drop(5),
  IO.trace("output")
)("And, as in uffish thought he stood,")
```

#### dropLast

Drop a certain number of characters from the end of a string

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.dropLast(6),
  IO.trace("output")
)("The Jabberwock, with eyes of flame,")
```

#### dropWhile

Drop characters based on a predicate function

```madlib
import IO from "IO"
import String from "String"

main = () => pipe(
  String.dropWhile((c) => c != '.'),
  IO.trace("output")
)("zipzop.zangzoon")
```

#### take

Take a certain number of characters from the beginning of the string

```madlib
```

#### takeLast

Take a certain number of characters from the end of a string

```madlib
```

#### takeWhile

Take characters based on a predicate function

```madlib
```

#### charAt

Return the character at a given index

```madlib
```

#### firstChar

Return the first character in a string

```madlib
```

#### lastChar

Return the last character in a string

```madlib
```

#### trim

Remove whitespace characters at the beginning and end of a string

```madlib
```

#### trimStart

Remove whitespace characters at the beginning of a string

```madlib
```

#### trimEnd

Remove whitespace characters at the end of a string

```madlib
```

#### length

Return the length of a string

```madlib
```

#### repeat

Return a list of repeated strings of a given length

```madlib
```

#### match

Match a string given a regular expression

```madlib
```

#### replace

Replace part of a string given a regular expression

```madlib
```

#### pushChar

Insert a char at the beginning of a string

```madlib
```

#### appendChar

Add a char at the end of a string

```madlib
```

#### reverse

Reverse a string

```madlib
```

#### includes

Test whether a string contains a given character

```madlib
```

#### startsWith

Test whether a string starts with a given string

```madlib
```

#### contains

Test whether a string contains a given string

```madlib
```

#### endsWith

Test whether a string ends with a given string

```madlib
```


### Function

#### complement

Given a predicate function, produce a function which has the opposite predicate

```madlib
```

#### always

Always return the first supplied parameter no matter what

```madlib
```

#### identity

Returns what it is given

```madlib
```

#### equals

Equality comparison as a function

```madlib
```

#### notEquals

Inequality comparison as a function

```madlib
```

#### ifElse

Ternary function which represents conditional logic

```madlib
```

#### when

`ifElse` but with no else case

```madlib
```

#### not

Given a boolean, produce the complement value (`true` becomes `false` and vice-versa)

```madlib
```

#### noop

Given any value, return Unit `{}`

```madlib
```

#### flip

Swaps the parameters of a binary function

```madlib
```

#### any

Given a predicate and a list, return true if the predicate matches anything

```madlib
```

#### all

Given a predicate and a list, return true if the predicate matches everything

```madlib
```

#### either

Functional "or": `either(() => true, () => false)`

```madlib
```

#### both

Functional "and": `both(() => true, () => false)`

```madlib
```

#### memoize

Memoize a function

```madlib
```


