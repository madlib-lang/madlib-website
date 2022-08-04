const {series, seriesNPS} = require("nps-utils")
const run = commands => commands.join(" && ")

const input = Object.freeze({
  mad: {
    Main: `client/Index.mad`,
  },
  views: `client/views`,
})

const out = Object.freeze({
  mad: {
    Main: `build/public/bundle.js`,
  },
  styles: {
    directory: `build/public/styles`,
    files: [
      `build/public/styles/global.css`,
      `build/public/styles/Footer.css`,
      `build/public/styles/SplashScreen.css`,
      `build/public/styles/Website.css`,
      `build/public/styles/Nav.css`,
      `build/public/styles/LinkedHeader.css`,
    ],
    main: `build/public/styles/main.css`,
  },
})


const runWhen = (cond, cmd) => `wait-on ${cond} && ${cmd}`

const compile = (from, to) => `madlib compile -i ${from} --target browser --bundle -o ${to}`

module.exports = {
  scripts: {
    info: "madlib --version",
    styles: {
      description: `get sassy with those files`,
      all: `sass ${input.views}:${out.styles.directory}`,
      group: run([
        `mkdir -p ${out.styles.directory}`,
        `touch ${out.styles.main}`,
        `cat ${out.styles.files.join(" ")} > ${out.styles.main}`,
      ]),
      script: `nps styles.all styles.group`,
    },
    build: {
      main: compile(input.mad.Main, out.mad.Main),
      starting: compile(input.mad.GettingStarted, out.mad.GettingStarted),
      examples: compile(input.mad.Examples, out.mad.Examples),
      docs: compile(input.mad.Docs, out.mad.Docs),
      projects: compile(input.mad.Projects, out.mad.Projects),
      dev: "nps build.main build.starting build.examples build.docs build.projects",
      vercel: run([
        "npm i @madlib-lang/madlib",
        "madlib install",
        "nps build.prod",
      ]),
      prod: run([
        `nps "build.main --optimize"`,
        `uglifyjs -m -c -o ${out.mad.Main} ${out.mad.Main}`,
        `nps styles`,
        "cp client/index.html build/public/",
        "cp -R client/assets build/public/",
      ]),
      html: "copy-and-watch client/*.html build/public/",
    },
    server: {
      dev: {
        build: "madlib compile --target llvm -i server/Main.mad -o build/service -w &",
        start: runWhen('./build/service', `./build/service`),
      },
    },
    sync: {
      description: "sync the browser",
      script:
        "browser-sync start --proxy localhost:3000 --files build/public/ --no-open --reload-debounce 100",
        // "browser-sync start --server build/public/ --files build/public/ --serveStatic build/public/ --no-open --reload-debounce 100",
        // "browser-sync start -c browsersync.config.js",
    },
    dev: {
      clientNonMad: `concurrently ${[
        `"sass --watch ${input.views}:${out.styles.directory}"`,
        `"nps styles.group"`,
        `"copy-and-watch --watch client/**/*.{html,svg,json} build/public/"`,
        `"copy-and-watch --watch client/assets/* build/public/assets/"`,
        // `"nps 'build.main -w &'"`,
        `"watch 'nps styles.group' client"`,
        `"${runWhen('http://localhost:3000', 'nps sync')}"`,
      ].join(" ")}`,
      server: series.nps(`server.dev.build`, `server.dev.start`),
      script: `concurrently ${[
        `"nps dev.clientNonMad"`,
        `"nps dev.server"`
      ].join(" ")}`
    },
    test: 'echo "Error: no test specified" && exit 1',
  },
}

