const { NODE_ENV = "development", HOST = "0.0.0.0", PORT = 4001 } = process.env;

const common = {
  env: NODE_ENV,
  host: HOST,
  port: PORT,
};

const development = {
  ...common,
};

const production = {
  ...common,
};

const config = {
  development,
  production,
};

// @ts-ignore
export default config[NODE_ENV];
