const path = require("path")
const withSass = require("@zeit/next-sass")

module.exports = withSass({})

// module.exports = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, "styles")],
//   },
// }

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/test/jobs",
        permanent: false,
      },
    ]
  },
}
