Once you have [installed Madlib](/docs/installation), we'll look at how to use it to compile and run programs.

## Setting up a new project

Madlib comes with a minimal project generator, `madlib new`:
```shell
madlib new PROJECT_NAME
```

In a folder where you intend to store your Madlib projects, run the following commands:
```shell
madlib new hello-world
cd hello-world
```

## Editing source files

If you inspect the `/src` folder, you should see the following in `Main.mad`:

```madlib
import IO from "IO"

main = () => {
  IO.putLine("Hello world")
}
```

## What is happening, line by line?

 1. `import IO from "IO"` - This imports the `IO` (Input / Output) module from Madlib's standard library.
 2. `main = () => {` - This defines a function named `main` and opens a function body
 3. `IO.putLine("Hello world")` - This calls the `putLine` function with a `"Hello world"` string. Note that Madlib has a specific distinction between double-quotes, as used here, which indicate string literals, and single-quotes, like `'a'` which are used to specify characters / `char` types.

## How can I run it?

In order to run `Main.mad`, execute this command:
```shell
madlib run src/Main.mad
```

## How can I compile it?

To build it for use in `node`, you can use the following command:
```shell
madlib compile --target node -i src/Main.mad -o build/hello-world.mjs
node ./build/hello-world.mjs
```

To build a native binary instead, change the `target` flag to `llvm` (the final possible option is `web`)
```
madlib compile --target llvm -i src/Main.mad -o build/hello-world
./build/hello-world
```
