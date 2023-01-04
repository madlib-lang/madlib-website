Predominantly there are two ways you can install `madlib` today.

## Via Node

You must first have [nodejs](https://nodejs.org/) installed. Then you can run:

Depending on your preferences, either of these should be identical in behavior. 
- `yarn global add @madlib-lang/madlib`
- `npm install @madlib-lang/madlib -g`

## From Source Code

You can download the archive of a build for your target from the [releases page](https://github.com/madlib-lang/madlib/releases), unarchive it wherever appropriate ( /opt might be a good candidate on linux/osx ), and add the location to your PATH in your bashrc file. Currently 5 targets are supported:
- linux glibc
- linux muslc
- osx x64
- osx arm64
- windows x64

### Debugging

Once `madlib` has been installed, running `madlib` (no arguments) or `madlib -h` should show the following text:

```shell
################################################
 ____    __  ____   _____   ____    ____  ______
|    \\  /  ||    \\  |    \\ |    |  |    ||      )
|     \\/   ||     \\ |     \\|    |_ |    ||     <
|__/\\__/|__||__|\\__\\|_____/|______||____||______)



Usage: madlib COMMAND
  madlib@0.18.5

Available options:
  -h,--help                Show this help text
  -v,--version             Show version

Available commands:
  compile                  compile madlib code to js
  run                      run a madlib module or package
  test                     test tools
  install                  install madlib packages
  package                  packages a library
  new                      create a new project
  doc                      generate documentation
  format                   format code
  lsp                      start language server
  config                   read informations about the current installation
```

