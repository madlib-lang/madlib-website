const run = commands => commands.join(" && ")

const input = Object.freeze({
  mad: {
    Main: `client/src/Index.mad`,
  },
  views: `client/src/views`,
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


const runWhen = (cond, cmd) => `
until ${cond}; do
  echo waiting...
  sleep 0.5
done
exec ${cmd}
`


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
      main: `madlib compile -i ${input.mad.Main} --target browser --bundle -o ${out.mad.Main} -w &`,
      dev: "nps build.main",
      vercel: run([
        "npm i @madlib-lang/madlib",
        "madlib install",
        "nps build.prod",
      ]),
      prod: run([
        `nps "build.main --optimize"`,
        `uglifyjs -m -c -o ${out.mad.Main} ${out.mad.Main}`,
        `nps styles`,
        "cp client/src/index.html build/public/",
        "cp -R client/src/assets build/public/",
      ]),
      html: "copy-and-watch client/src/*.html build/public/",
    },
    server: {
      dev: {
        build: "madlib compile --target llvm -i server/src/Main.mad -o build/service -w",
        start: runWhen('cat ./build/service >&/dev/null', `./build/service`),
      },
    },
    sync: {
      description: "sync the browser",
      script:
        "browser-sync start --proxy localhost:3000 --files build/public/ --no-open --reload-debounce 100",
        // "browser-sync start --server build/public/ --files build/public/ --serveStatic build/public/ --no-open --reload-debounce 100",
        // "browser-sync start -c browsersync.config.js",
    },
    dev: `concurrently ${[
      `"sass --watch ${input.views}:${out.styles.directory}"`,
      `"nps styles.group"`,
      `"copy-and-watch --watch client/src/**/*.{html,svg,json} build/public/"`,
      `"copy-and-watch --watch client/src/assets/* build/public/assets/"`,
      `"nps build.dev"`,
      `"nps server.dev.build"`,
      `"watch 'nps styles.group' client/src"`,
      `"nps server.dev.start"`,
      `"${runWhen('curl localhost:3000 >&/dev/null', 'nps sync')}"`,
    ].join(" ")}`,
    test: 'echo "Error: no test specified" && exit 1',
  },
}

