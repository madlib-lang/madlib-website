## Literals

### Integer
Integer literals are whole numbers, possibly prefixed with `-`.

#### Example
```madlib
1
-1732
```

### Byte
Integer literals are whole numbers between 0 and 255. 

#### Example
```madlib
(1 :: Byte)
(255 :: Byte)
(0 :: Byte)
```
**NB**: Note that if bytes are used in a context where the type is not coerced (as above), it might resolve as an integer due to how the Number instance default resolution works.

### Float
Float literals are numbers with a decimal part, possibly prefixed with `-`.

#### Example
```madlib
1.0
-1732.05
```

### String
Strings are characters within double quotes, or backticks for templated strings.

#### Example
```madlib
"hello world"

userId = "arnaud"
`https://domain.tld/users/${userId}`
```

### Character
Character literals are single characters within single quotes, sometimes with a leading escape `\`.

#### Example
```madlib
'a'
'\n'
```

#### Boolean
Boolean literals are either `true` or `false`.

#### Example
```madlib
true
false
```

#### Unit
The **Unit** value can be used in type-specific constructs to represent an empty record.

#### Example
```madlib
{}
```
**NB**: Unit only has one possible value `{}`

## Lambdas
In Madlib, a function is simply a lambda, which may be assigned, passed around or used inline directly.

#### Example
```madlib
(a, b) => a * b
product = (a, b) => a * b
```
**NB**: All binary or greater (more than a single parameter) functions in Madlib are automatically curried.
