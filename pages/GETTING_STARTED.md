## Quick Installation

The easiest way to install `madlib` is via `npm`:
```sh
npm i @madlib-lang/madlib -g
```

You are also welcome to [install from source](/docs/installation#from-source-code).

## Making a new project

```sh
madlib new <project-name>
cd <project-name>
```

## Running your project

```sh
madlib run src/Main.mad
```

You can see additional commands and information by running `madlib --help` or viewing the [Command Line Interface](/docs/cli) page.

## Development

### Syntax

You can learn much more specific syntax on the [Language Features](/docs/language-features') page, but here is a quick example of some Madlib syntax you could drop in your new project's `src/Main.mad` file:

```madlib
import IO from "IO"

greetWith :: String -> String -> String
greetWith = (greeting, x) => `${greeting} ${x}`

type PetType
  = PetDog
  | PetCat
  | PetHamster
  | PetCthulu

type Creature
  = Human(String)
  | Alien(String)
  | Pet(String, PetType)
  | UnknownCreature

greetCreature :: String -> Creature -> String
greetCreature = (greeting, critter) => pipe(
  where {
    Human(name) => name
    Alien(name) => name
    Pet(name, _) => name
    UnknownCreature => "Unknown"
  },
  greetWith(greeting)
)(critter)

main = () => {
  pipe(
    greetCreature("Sup?"),
    IO.trace("Transmission!")
  )(Alien("Xyxyxyxyx"))
}
```

As [mentioned above](#running-your-project) you can run this with `madlib run src/Main.mad` 

Once you've familiarized yourself with the core syntax, one of the best ways to get to know the language is to work through the [examples](/examples) or learn more in our [documentation](/docs/introduction) page.
