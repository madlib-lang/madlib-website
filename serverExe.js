function isDirOrQ(f, stat) { return stat.isDirectory() || f === 'Q'; }

const filter = (f, stat) => {
//   console.log(f, stat);
  return f === "build/service";
}

module.exports = filter;
