Once you've [installed](/docs/installation) `madlib` locally, you can run `madlib --help` to show similar documentation as you see on this page, but within the terminal. Additionally, you can run individual subcommands with the help flag, e.g. `madlib run --help` will bring up specific help text for `madlib run`

### `madlib compile`

Compile Madlib code

#### Usage
```
madlib compile (-i|--input INPUT) [-o|--output OUTPUT]
               [-c|--config CONFIG] [-v|--verbose] [-d|--debug]
               [-b|--bundle] [--optimize] [-t|--target TARGET]
               [-w|--watch] [--coverage]
```

#### Available options:
 - `--help` (`-h`) - Show this help text in terminal
 - `--input INPUT` (`-i`) - What source to compile
 - `--output OUTPUT` (`-o`) - What path to compile to (default: "./build/")
 - `--config CONFIG` (`-c`) - What config to use (default: "madlib.json")
 - `--verbose` (`-v`) - Verbose output
 - `--debug` (`-d`) - Print AST info
 - `--bundle` (`-b`) - Bundle the compiled output in one file
 - `--optimize` - Optimize the output to generate smaller output files
 - `--target TARGET` (`-t`) - What target it should compile to, possible values are: "browser" or "node" or "llvm" (default: "node")
 - `--watch` (`-w`) - watch file changes for fast rebuilds
 - `--coverage` - compile with coverage enabled

### `madlib run`

Execute a Madlib program

#### Usage
```
madlib run PROGRAM [ARGS]
```

#### Available options
 - `--help` (`-h`) - Show this help text in terminal
 - `PROGRAM` - The package or module to run
 - `ARGS` - Arguments to pass to the program. **NB**: Note in order to pass flags you need to use the `--` delimiter

### `madlib test`

Test a Madlib program

#### Usage
```
madlib test [-i|--input INPUT] [-t|--target TARGET] [-w|--watch]
            [--coverage]
```

#### Available options
 - `--help` (`-h`) - Show this help text in terminal
 - `--input INPUT` (`-i`) - What to test (default: ".")
 - `--target TARGET` (`-t`) - What target it should compile to, possible values are: "browser", "node" or "llvm" (default: 'node')
 - `--watch` (`-w`) - watch file changes for fast rebuilds
 - `--coverage` - compile with coverage enabled

### `madlib install`

Install a madlib package

#### Usage
```
madlib install PACKAGE
```

#### Available options
 - `PACKAGE` - This can be any valid module path, local or a git repository. See [modules](/docs/modules) for more.

### `madlib package`

Package a Madlib library for publication

#### Usage
```
madlib package [-r|--rebuild]
```

#### Available options
 - `--help` (`-h`) - Show this help text in terminal
 - `--rebuild` (`-r`) - Rebuilds a package for an already built version and only bumps if there's a bigger change than the initial one

### `madlib new`

Create a new Madlib project

#### Usage
```
madlib new FOLDER
```

#### Available options
 - `--help` (`-h`) - Show this help text in terminal
 - `FOLDER` - The folder to create for the new project

### `madlib doc`

Automatically generate documentation based upon specially formatted strings! See the [autodoc](docs/autodoc) page for more.

#### Usage
```
madlib doc (-i|--input INPUT)
```

#### Available options:
 - `--help` (`-h`) - Show this help text in terminal
 - `--input INPUT` (`-i`) - What source(s) you want to generate documentation for

### `madlib format`

Format a Madlib file automatically

#### Usage
```
madlib format [-i|--input INPUT] [--text CODE] [--fix] [--width WIDTH]
```

#### Available options:
 - `--help` (`-h`) - Show this help text
 - `--input INPUT` (`-i`) - What source(s) you want to format
 - `--text CODE` - Code you want to format
 - `--fix` - Applies the new formatting to the file
 - `--width WIDTH` - target width of document (default: 100)

### `madlib lsp`

Start the Madlib language server

#### Usage
```
madlib lsp
```

### `madlib config`

Read information about the current installation

#### Usage
```
madlib config (COMMAND)
```

#### Available options:
 - `--help` (`-h`) - Show this help text

#### Available commands:
 - `runtime-headers-path` - Show the path of the runtime headers
 - `runtime-lib-headers-path` - Show the path of headers from runtime libraries such as `libuv` or `libgc`
 - `install-dir` - Show the path to the local madlib installation
