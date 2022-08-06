const run = commands => commands.join(" && ")

const input = Object.freeze({
  mad: {
    Main: `src/client/Index.mad`,
  },
  views: `src/client/views`,
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
      `build/public/styles/Playground.css`,
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
      main: `madlib compile -i ${input.mad.Main} --target browser --bundle -o ${out.mad.Main}`,
      watch: `madlib compile -i ${input.mad.Main} --target browser --bundle -o ${out.mad.Main} -w &`,
      dev: "nps build.watch",
      vercel: run([
        "npm i @madlib-lang/madlib",
        "madlib install",
        "nps build.prod",
      ]),
      prod: run([
        `nps "build.main"`,
        `uglifyjs -m -c -o ${out.mad.Main} ${out.mad.Main}`,
        `nps styles.all styles.group`,
        "cp src/client/index.html build/public/",
        "cp -R src/client/assets build/public/",
        "cp src/client/*.json build/public/",
        "nps server.prod.build",
      ]),
      html: "copy-and-watch src/client/*.html build/public/",
    },
    server: {
      dev: {
        build: "madlib compile --target llvm -i src/server/Main.mad -o build/service -w",
        start: "sh ./start-server.sh",
        restart: "sh ./restart-server.sh",
      },
      prod: {
        build: "madlib compile --target llvm -i src/server/Main.mad -o build/service",
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
      `"nps styles.all styles.group && watch 'nps styles.group' src/client"`,
      `"copy-and-watch --watch src/client/**/*.{html,svg,json} build/public/"`,
      `"copy-and-watch --watch src/client/assets/* build/public/assets/"`,
      `"nps build.dev"`,
      `"nps server.dev.build"`,
      // `"nps server.dev.start"`,
      // `"watch --filter=serverExe.js 'nps server.dev.restart' ./build/service"`,
      `"watch --filter=serverExe.js 'nps server.dev.restart' ./build/"`,
      `"${runWhen('curl localhost:3000 >&/dev/null', 'nps sync')}"`,
    ].join(" ")}`,
    test: 'echo "Error: no test specified" && exit 1',
  },
}

