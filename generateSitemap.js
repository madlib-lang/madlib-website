const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const fs = require("fs");
var format = require('xml-formatter');
const content = require("./src/client/content.json");

const HOSTNAME = "https://madlib.space";
const date = new Date();

// An array with your links
const links = content.nav.map(({ href, priority, changefreq }) => ({
  url: href,
  priority,
  changefreq,
  lastmod: date,
}));

//[{ url: "/page-1/", changefreq: "daily", priority: 0.3 }];

// Create a stream to write to
const stream = new SitemapStream({ hostname: HOSTNAME });

// Return a promise that resolves with your XML string
streamToPromise(Readable.from(links).pipe(stream))
  .then(data => data.toString())
  .then(format)
  .then(console.log);
