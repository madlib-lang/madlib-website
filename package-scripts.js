const BUNDLE = `build/bundle.js`
const run = (...args) => args.join(" && ")

const sass = (from, to) => `sass ${from} ${to}`

const compileForBrowser = (file, optimize = false) =>
  `madlib compile -i ${file} --target browser --bundle${
    optimize ? " --optimize" : ""
  } -o ${BUNDLE}`
const copy = to => from => `cp ${from} ${to}`
const copyToBuild = copy("build/")

const watch = (...args) => `copy-and-watch ${args.join(" ")}`

const OUTPUT = {
  styles: {
    main: "build/styles/main.css",
    global: "build/styles/global.css",
    footer: "build/styles/Footer.css",
    splash: "build/styles/SplashScreen.css",
    website: "build/styles/Website.css"
  }
}

module.exports = {
  scripts: {
    info: "madlib --version",
    style: {
      script: `nps style.global style.splash style.footer style.website style.copy`,
      global: sass("src/views/global.scss", OUTPUT.styles.global),
      splash: sass("src/views/SplashScreen.scss", OUTPUT.styles.splash),
      footer: sass("src/views/Footer.scss", OUTPUT.styles.footer),
      website: sass("src/views/Website.scss", OUTPUT.styles.website),
      copy: run(
        `touch ${OUTPUT.styles.main}`,
        `cat ${OUTPUT.styles.global} ${OUTPUT.styles.footer} ${OUTPUT.styles.splash} ${OUTPUT.styles.website} > ${OUTPUT.styles.main}`
      )
    },
    build: {
      script: `nps build.dev`,
      dev: compileForBrowser("src/Main.mad"),
      prod: run(
        compileForBrowser("src/Main.mad", true),
        `uglifyjs -m -c -o ${BUNDLE} ${BUNDLE}`,
        `nps style`,
        copyToBuild("src/index.html"),
        copyToBuild("src/content.json"),
        copyToBuild("-R src/assets")
      ),
      sass: `nps style`,
      html: watch("src/**/*.html", "build/")
    },
    vercelBuild: run(
      "npm i @madlib-lang/madlib",
      "madlib install",
      "nps build.prod"
    ),
    sync: `browser-sync start --server build --files build/**`,
    watch: {
      styles: sass("--watch src/views/main.scss", "build/styles/main.css"),
      files: watch(`--watch`, `src/**/*.{html,svg,json}`, `build/`),
      assets: watch(`--watch`, `src/assets/*`, `build/assets/`)
    },
    dev: `concurrently "nps sync" "nps watch.styles" "nps watch.files" "nps watch.assets" "watch 'nps build.dev' src"`,
    test: 'echo "Error: no test specified" && exit 1'
  }
}
