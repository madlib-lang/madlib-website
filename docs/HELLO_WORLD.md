Now that you have installed Madlib, we'll look at how to use it to compile and run programs.

Below is a hello world program written in Madlib.

```madlib
import IO from "IO"

main = () => {
  IO.putLine("Hello world")
}
```

## How to run it?

Madlib comes with a minimal project generator that can be used as follows:
```shell
madlib new PROJECT_FOLDER
```

So go in a folder where you intend to store your projects and run the following commands to run the program with nodejs:
```
madlib new hello-world
cd hello-world
madlib run src/Main.mad
```

And to build a native binary that you can directly run you'd do the following:
```
madlib new hello-world
cd hello-world
madlib compile --target llvm -i src/Main.mad -o build/hello-world
./build/hello-world
```
