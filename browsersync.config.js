const raw = require("./src/client/content.json")
const { nav } = raw
const routes = nav.reduce((agg, { href }) => {
  const link = href.slice(1, Infinity)
  return Object.assign({}, agg, {
    [href]:
      href === "/"
        ? `./build/index.html`
        : `./build/${link.toLowerCase()}.html`,
  })
}, {})
console.log({ routes })

module.exports = {
  ui: {
    port: 4041,
  },
  port: 4040,
  ghostMode: false,
  server: {
    baseDir: "./build",
    routes,
  },
  reloadDebounce: 1500,
  open: false,
  notify: false,
}
