const run = commands => commands.join(" && ")

const input = Object.freeze({
  mad: {
    Main: `src/pages/Index.mad`,
    Examples: `src/pages/Examples.mad`,
    Docs: `src/pages/Docs.mad`,
    Projects: `src/pages/Projects.mad`,
  },
  views: `src/views`,
})

const out = Object.freeze({
  mad: {
    Main: `build/bundle-main.js`,
    Examples: `build/bundle-examples.js`,
    Docs: `build/bundle-docs.js`,
    Projects: `build/bundle-projects.js`,
  },
  styles: {
    directory: `build/styles`,
    files: [
      `build/styles/global.css`,
      `build/styles/Footer.css`,
      `build/styles/SplashScreen.css`,
      `build/styles/Website.css`,
      `build/styles/Nav.css`,
      `build/styles/LinkedHeader.css`,
    ],
    main: `build/styles/main.css`,
  },
})

module.exports = {
  scripts: {
    info: "madlib --version",
    styles: {
      description: `get sassy with those files`,
      all: `sass ${input.views}:${out.styles.directory}`,
      group: run([
        `touch ${out.styles.main}`,
        `cat ${out.styles.files.join(" ")} > ${out.styles.main}`,
      ]),
      script: `nps styles.all styles.group`,
    },
    build: {
      main: `madlib compile -i ${input.mad.Main} --target browser --bundle -o ${out.mad.Main}`,
      examples: `madlib compile -i ${input.mad.Examples} --target browser --bundle -o ${out.mad.Examples}`,
      docs: `madlib compile -i ${input.mad.Docs} --target browser --bundle -o ${out.mad.Docs}`,
      projects: `madlib compile -i ${input.mad.Projects} --target browser --bundle -o ${out.mad.Projects}`,
      dev: "nps build.main build.examples build.docs build.projects",
      vercel: run([
        "npm i @madlib-lang/madlib",
        "madlib install",
        "nps build.prod",
      ]),
      prod: run([
        `nps "build.main --optimize"`,
        `nps "build.examples --optimize"`,
        `nps "build.docs --optimize"`,
        `nps "build.projects--optimize"`,
        `uglifyjs -m -c -o ${out.mad.Main} ${out.mad.Main}`,
        `uglifyjs -m -c -o ${out.mad.Examples} ${out.mad.Examples}`,
        `uglifyjs -m -c -o ${out.mad.Docs} ${out.mad.Docs}`,
        `uglifyjs -m -c -o ${out.mad.Projects} ${out.mad.Projects}`,
        `nps styles`,
        "cp src/index.html build/",
        "cp src/examples.html build/",
        "cp src/docs.html build/",
        "cp src/projects.html build/",
        "cp -R src/assets build/",
      ]),
      html: "copy-and-watch src/**/*.html build/",
    },
    sync: {
      description: "sync the browser",
      script: "browser-sync start --server build --files build/**",
    },
    dev: `concurrently ${[
      `"nps sync"`,
      `"sass --watch ${input.views}:${out.styles.directory}"`,
      `"nps styles.group"`,
      `"copy-and-watch --watch src/**/*.{html,svg,json} build/"`,
      `"copy-and-watch --watch src/assets/* build/assets/"`,
      `"watch 'nps build.dev' src"`,
      `"watch 'nps styles.group' src"`,
    ].join(" ")}`,
    test: 'echo "Error: no test specified" && exit 1',
  },
}
