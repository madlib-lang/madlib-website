const run = commands => commands.join(" && ")

const input = Object.freeze({
  mad: {
    Main: `src/Main.mad`
  },
  styles: `src/views`
})

const out = Object.freeze({
  mad: {
    Main: `build/bundle.js`
  },
  styles: {
    directory: `build/styles`,
    files: [
      `build/styles/global.css`,
      `build/styles/Footer.css`,
      `build/styles/SplashScreen.css`,
      `build/styles/Website.css`
    ],
    main: `build/styles/main.css`
  }
})

module.exports = {
  scripts: {
    info: "madlib --version",
    styles: {
      description: `get sassy with those files`,
      all: `sass ${input.styles}:${out.styles.directory}`,
      group: run([
        `touch ${out.styles.main}`,
        `cat ${out.styles.files.join(" ")} > ${out.styles.main}`
      ]),
      script: `nps styles.all styles.group`
    },
    build: {
      dev: `madlib compile -i ${input.mad.Main} --target browser --bundle -o ${out.mad.Main}`,
      vercel: run([
        "npm i @madlib-lang/madlib",
        "madlib install",
        "nps build.prod"
      ]),
      prod: run([
        `madlib compile -i ${input.mad.Main} --target browser --bundle --optimize -o ${out.mad.Main}`,
        `uglifyjs -m -c -o ${out.mad.Main} ${out.mad.Main}`,
        `nps styles`,
        "cp src/index.html build/",
        "cp src/content.json build/",
        "cp -R src/assets build/"
      ]),
      html: "copy-and-watch src/**/*.html build/"
    },
    sync: {
      description: "sync the browser",
      script: "browser-sync start --server build --files build/**"
    },
    dev: `concurrently ${[
      `"nps sync"`,
      `"sass --watch ${input.styles}:${out.styles.directory}"`,
      `"nps styles.group"`,
      `"copy-and-watch --watch src/**/*.{html,svg,json} build/"`,
      `"copy-and-watch --watch src/assets/* build/assets/"`,
      `"watch 'nps build.dev' src"`,
      `"watch 'nps styles.group' ${out.styles.directory}"`
    ].join(" ")}`,
    test: 'echo "Error: no test specified" && exit 1'
  }
}
