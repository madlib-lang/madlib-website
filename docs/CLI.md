### Command-Line Tool

Once you've [installed](/docs/installation) `madlib` locally, you can run individual subcommands with the help flag, e.g. `madlib run --help` will bring up command-specific options

#### compile

Compile Madlib code

**Usage**:
```
madlib compile (-i|--input INPUT) [-o|--output OUTPUT]
               [-c|--config CONFIG] [-v|--verbose] [-d|--debug]
               [-b|--bundle] [--optimize] [-t|--target TARGET]
               [-w|--watch] [--coverage]
```

##### Available options:
 - `--help` (`-h`) - Show this help text in terminal
 - `--input INPUT` (`-i`) - What source to compile
 - `--output OUTPUT` (`-o`) - What path to compile to (default: "./build/")
 - `--config CONFIG` (`-c`) - What config to use (default: "madlib.json")
 - `--verbose` (`-v`) - Verbose output
 - `--debug` (`-d`) - Print AST info
 - `--bundle` (`-b`) - Bundle the compiled output in one file
 - `--optimize` - Optimize the output to generate smaller output files
 - `--target TARGET` (`-t`) - What target it should compile to, possible values are: browser or node (default: "node")
 - `--watch` (`-w`) - watch file changes for fast rebuilds
 - `--coverage` - compile with coverage enabled

#### run

Execute a Madlib program

**Usage**:
```
madlib run PROGRAM [ARGS]
```

##### Available options
 - `--help` (`-h`) - Show this help text in terminal
 - `PROGRAM` - The package or module to run
 - `ARGS` - Arguments to pass to the program. **NB**: Note in order to pass flags you need to use the `--` delimiter

#### test

Test a Madlib program

**Usage**:
```
madlib test [-i|--input INPUT] [-t|--target TARGET] [-w|--watch]
            [--coverage]
```

##### Available options
 - `--help` (`-h`) - Show this help text
 - `--input INPUT` (`-i`) - What to test (default: ".")
 - `--target TARGET` (`-t`) - What target it should compile to, possible values are: browser or node (default: 'node')
 - `--watch` (`-w`) - watch file changes for fast rebuilds
 - `--coverage` - compile with coverage enabled
