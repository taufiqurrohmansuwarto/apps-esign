const withAntdLess = require("next-plugin-antd-less");

const isProd = process.env.NODE_ENV === "production";

function getBasePath() {
  var basePath = "";

  if (isProd && process.env.BASE_PATH) {
    if (process.env.BASE_PATH.startsWith("/")) {
      basePath = process.env.BASE_PATH;
    } else {
      basePath = "/" + process.env.BASE_PATH;
    }
  }

  return basePath;
}

module.exports = withAntdLess({
  basePath: "/esign",
  async redirects() {
    return [
      {
        destination: "/documents/list/all",
        source: "/documents",
        permanent: true,
      },
    ];
  },
  domains: [""],
  modifyVars: { "@primary-color": "#04f" },
  lessVarsFilePath: "./src/styles/variables.less",
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},
  webpack(config) {
    return config;
  },
  publicRuntimeConfig: {
    basePath: getBasePath(),
  },
});
