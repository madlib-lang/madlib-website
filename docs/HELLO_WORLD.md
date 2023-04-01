Once you have [installed Madlib](/docs/installation), we'll look at how to use it to compile and run programs.

## Setting up a new project with `madlib new`

Madlib comes with a minimal project generator that can be used as follows:
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

## How can I run it?

In order to run `Main.mad` you can run:
```shell
madlib run src/Main.mad
```

## How can I compile it?

To build it for use in `node`, you can use the following command:
```shell
madlib compile --target node -i src/Main.mad -o build/hello-world.mjs
node ./build/hello-world.mjs
```

To instead build a native binary, change the `target` flag to `llvm` (other possible option is `web`)
```
madlib compile --target llvm -i src/Main.mad -o build/hello-world
./build/hello-world
```
