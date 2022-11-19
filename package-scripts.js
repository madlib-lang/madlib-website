const run = (commands) => commands.join(" && ");

const input = Object.freeze({
  mad: {
    Main: `src/client/Main.mad`,
  },
  views: `src/client/views`,
});

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
  sitemap: "build/public/sitemap.xml",
});

const DOCS_TO_UPDATE = [
  {
    jsonPath: "docs.0.content",
    filePath: "docs/INTRODUCTION.md",
  },
  {
    jsonPath: "docs.1.content",
    filePath: "docs/GETTING_STARTED.md",
  },
  {
    jsonPath: "docs.2.content",
    filePath: "docs/INSTALLATION.md",
  },
  {
    jsonPath: "docs.3.content",
    filePath: "docs/HELLO_WORLD.md",
  },
  {
    jsonPath: "docs.4.content",
    filePath: "docs/LANGUAGE_FEATURES.md",
  },
  {
    jsonPath: "docs.5.content",
    filePath: "docs/EXPRESSIONS.md",
  },
];

const runWhen = (cond, cmd) => `
until ${cond}; do
  echo waiting...
  sleep 0.5
done
exec ${cmd}
`;

module.exports = {
  scripts: {
    info: "madlib --version",
    sitemap: {
      description: "builds sitemap based on content.json",
      script: `node generateSitemap.js > ${out.sitemap}`,
    },
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
    docs: {
      update: {
        description:
          "updates content keys for the docs in the content.json file",
        script: run([
          "madlib compile --target llvm -i src/scripts/UpdateJsonFieldWithFile.mad -o build/updateDocs",
          ...DOCS_TO_UPDATE.map(
            ({ jsonPath, filePath }) =>
              `./build/updateDocs src/client/content.json ${filePath} ${jsonPath}`
          ),
        ]),
      },
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
        `nps docs.update`,
        `nps "build.main"`,
        `uglifyjs -m -c -o ${out.mad.Main} ${out.mad.Main}`,
        `nps styles.all styles.group`,
        "cp src/client/index.html build/public/",
        "cp src/client/robots.txt build/public/",
        "cp -R src/client/assets build/public/",
        "cp src/client/*.json build/public/",
        "nps server.prod.build",
        "nps sitemap",
      ]),
      html: "copy-and-watch src/client/*.html build/public/",
    },
    server: {
      dev: {
        build:
          "madlib compile --target llvm -i src/server/Main.mad -o build/service -w",
        start: "sh ./start-server.sh",
        restart: "sh ./restart-server.sh",
      },
      prod: {
        build:
          "madlib compile --target llvm -i src/server/Main.mad -o build/service",
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
      `"watch 'nps docs.update' ./docs"`,
      `"sass --watch ${input.views}:${out.styles.directory}"`,
      `"nps styles.all styles.group && watch 'nps styles.group' src/client"`,
      `"copy-and-watch --watch src/client/**/*.{html,svg,json} build/public/"`,
      `"copy-and-watch --watch src/client/assets/* build/public/assets/"`,
      `"nps build.dev"`,
      `"nps server.dev.build"`,
      `"nps sitemap"`,
      // `"nps server.dev.start"`,
      // `"watch --filter=serverExe.js 'nps server.dev.restart' ./build/service"`,
      `"watch --filter=serverExe.js 'nps server.dev.restart' ./build/"`,
      `"${runWhen("curl localhost:3000 >&/dev/null", "nps sync")}"`,
    ].join(" ")}`,
    test: 'echo "Error: no test specified" && exit 1',
  },
};
