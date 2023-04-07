### `String.toLower`

> `String.toLower :: String -> String`

Convert a string to lowercase

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.toLower,
    IO.trace("output")
  )("Madlib Is Cool")
}
```

### `String.toUpper`

> `String.toUpper :: String -> String`

Convert a string to uppercase


```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.toUpper,
    IO.trace("output")
  )("Madlib Is Cool")
}
```


### `String.split`

> `String.split :: String -> String -> List String`

Split a string by another search string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.toLower,
    String.split("i"),
    IO.trace("output")
  )("Madlib Is Cool")
}
```

### `String.join`

> `String.join :: String -> List String -> String`

Join a string with a given delimiter string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    map(String.toUpper),
    String.join(" > "),
    IO.trace("output")
  )(["Madlib", "Is", "Cool"])
}
```

### `String.lines`

> `String.lines :: String -> List String`

Split a string by newlines

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.lines,
    IO.trace("output")
  )(`’Twas brillig, and the slithy toves
Did gyre and gimble in the wabe:
All mimsy were the borogoves,
And the mome raths outgrabe.`)
}
```

### `String.unlines`

> `String.unlines :: List String -> String`

Join a string by newlines

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.unlines,
    IO.trace("output")
  )([
    "'Beware the Jabberwock, my son!",
    "The jaws that bite, the claws that catch!",
    "Beware the Jubjub bird, and shun",
    "The frumious Bandersnatch!'"
  ])
}
```

### `String.words`

> `String.words :: String -> List String`

Split a string by spaces

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.words,
    IO.trace("output")
  )(`He took his vorpal sword in hand;`)
}
```

### `String.unwords`

> `String.unwords :: List String -> String`

Join a string by spaces

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
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
}
```

### `String.toList`

> `String.toList :: String -> List Char`

Convert a String to a List Char

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.toList,
    IO.trace("output")
  )(`So rested he by the Tumtum tree`)
}
```

### `String.fromList`

> `String.fromList :: List Char -> String`

Convert a List Char to a String

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.fromList,
    IO.trace("output")
  )(['A','n','d',' ','s','t',
  'o','o','d',' ','a','w','h',
  'i','l','e',' ','i','n',' ',
  't','h','o','u','g','h','t','.'])
}
```

### `String.slice`

> `String.slice :: Integer -> Integer -> String -> String`

Cut part of a string out of another string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.slice(0, 6),
    IO.trace("output")
  )("Madlib Is Cool")
}
```

### `String.isEmpty`

> `String.isEmpty :: String -> Boolean`

Test whether a string is empty `""`

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.isEmpty
    IO.trace("output")
  )("")
}
```

### `String.drop`

> `String.drop :: Integer -> String -> String`

Drop a certain number of characters from the beginning of a string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.drop(5),
    IO.trace("output")
  )("And, as in uffish thought he stood,")
}
```

### `String.dropLast`

> `String.dropLast :: Integer -> String -> String`

Drop a certain number of characters from the end of a string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.dropLast(7),
    IO.trace("output")
  )("The Jabberwock, with eyes of flame,")
}
```

### `String.dropWhile`

> `String.dropWhile :: (Char -> Boolean) -> String -> String`

Drop characters based on a predicate function

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.dropWhile((c) => c != 'f'),
    IO.trace("output")
  )("Came whiffling through the tulgey wood,")
}
```

### `String.take`

> `String.take :: Integer -> String -> String`

Take a certain number of characters from the beginning of the string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.take(11),
    IO.trace("output")
  )("And burbled as it came!")
}
```

### `String.takeLast`

> `String.takeLast :: Integer -> String -> String`

Take a certain number of characters from the end of a string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.takeLast(23),
    IO.trace("output")
  )("One, two! One, two! And through and through")
}
```

### `String.takeWhile`

> `String.takeWhile :: (Char -> Boolean) -> String -> String`

Take characters based on a predicate function

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.takeWhile((c) => c != 'b'),
    IO.trace("output")
  )("The vorpal blade went snicker-snack!")
}
```

### `String.charAt`

> `String.charAt :: Integer -> String -> Maybe Char`

Return the character at a given index. Since it may not exist, this returns a Maybe.

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.charAt(5),
    IO.trace("output")
  )(`He left it dead, and with its head`)
}
```

### `String.firstChar`

> `String.firstChar :: String -> Maybe Char`

Return the first character in a string. Since it may not exist, this returns a Maybe.

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.firstChar,
    IO.trace("output")
  )(`He went galumphing back.`)
}
```

### `String.lastChar`

> `String.lastChar :: String -> Maybe Char`

Return the last character in a string. Since it may not exist, this returns a Maybe.

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.lastChar,
    IO.trace("output")
  )(`He went galumphing back.`)
}
```

### `String.trim`

> `String.trim :: String -> String`

Remove whitespace characters at the beginning and end of a string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.trim,
    IO.trace("output")
  )(`  Come to my arms, my beamish boy!  `)
}
```

### `String.trimStart`

> `String.trimStart :: String -> String`

Remove whitespace characters at the beginning of a string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.trimStart,
    IO.trace("output")
  )(`    O frabjous day! Callooh! Callay!”`)
}
```

### `String.trimEnd`

> `String.trimEnd :: String -> String`

Remove whitespace characters at the end of a string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.trimEnd,
    IO.trace("output")
  )(`He chortled in his joy.     `)
}
```

### `String.length`

> `String.length :: String -> Integer`

Return the length of a string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.length,
    IO.trace("output")
  )(`’Twas brillig, and the slithy toves`)
}
```

### `String.repeat`

> `String.repeat :: Char -> Integer -> String`

Given a character and an integer `x`, return a string with that character repeated `x` times

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.repeat('x'),
    IO.trace("output")
  )(3)
}
```

### `String.match`

> `String.match :: String -> String -> Boolean`

Match a string given a regular expression

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    map(String.match("[a-f]+")),
    IO.trace("output")
  )(["deadbeef", "growl"])
}
```

### `String.replace`

> `String.replace :: String -> String -> String -> String`

Replace part of a string given a regular expression

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    map(String.replace("[a-f]+", "xxx")),
    IO.trace("output")
  )(["deadbeef", "growl"])
}
```

### `String.pushChar`

> `String.pushChar :: Char -> String -> String`

Insert a char at the beginning of a string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.pushChar('h'),
    IO.trace("output")
  )("ey now")
}
```

### `String.appendChar`

> `String.appendChar :: Char -> String -> String`

Add a char at the end of a string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.appendChar('w'),
    IO.trace("output")
  )("hey no")
}
```

### `String.reverse`

> `String.reverse :: String -> String`

Reverse a string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.reverse,
    IO.trace("output")
  )("Madam I'm Adam")
}
```

### `String.includes`

> `String.includes :: Char -> String -> Boolean`

Test whether a string contains a given character

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    String.includes('x'),
    IO.trace("output")
  )("Madam I'm Adam")
}
```

### `String.startsWith`

> `String.startsWith :: String -> String -> Boolean`

Test whether a string starts with a given string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    map(String.startsWith("Mad")),
    IO.trace("output")
  )(["Madam I'm Adam", "Sad am I mad. am"])
}
```

### `String.contains`

> `String.contains :: String -> String -> Boolean`

Test whether a string contains a given string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    map(String.toLower),
    map(String.contains("mad")),
    IO.trace("output")
  )(["Madam I'm Adam", "Sad am I mad. am"])
}
```

### `String.endsWith`

> `String.endsWith :: String -> String -> Boolean`

Test whether a string ends with a given string

```madlib
import IO from "IO"
import String from "String"

main = () => {
  pipe(
    map(String.endsWith("am")),
    IO.trace("output")
  )(["Madam I'm Adam", "Sad am I mad. am"])
}
```
