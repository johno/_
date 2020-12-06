const reactConfig = {
  presets: ["@babel/preset-react", "@babel/preset-env"],
};

const testConfig = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
};

module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-env"],
  env: {
    test: testConfig,
  },
};
