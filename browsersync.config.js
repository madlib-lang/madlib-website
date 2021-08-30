const raw = require("./src/content.json")
const { nav } = raw
const routes = nav.reduce((agg, { href }) =>
  Object.assign({}, agg, {
    [href]:
      href === "/"
        ? `./build/index.html`
        : `./build/${href.toLowerCase()}.html`,
  })
)

module.exports = {
  ui: {
    port: 4041,
  },
  port: 4040,
  ghostMode: false,
  server: {
    baseDir: "./build",
    routes: {
      "/examples": "./build/examples.html",
      "/docs": "./build/docs.html",
      "/projects": "./build/projects.html",
    },
  },
  reloadDebounce: 1500,
  open: false,
  notify: false,
}
