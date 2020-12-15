import * as Koa from "koa";
import config from "./config";
import middlewares from "./middlewares";
import router from "./routes";
import { Model } from "objection";
import * as Knex from "knex";
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV || "development";
const { host, port } = config;
const app = new Koa();
const knexConfig = require("../knexfile")[env];
const knex = Knex(knexConfig);

knex.migrate.latest();
Model.knex(knex);

knex
  .raw("select 1+1 as result")
  .then(() => {
    console.log("Connection to banking successfully completed");
  })
  .catch((err: any) => console.log("Connection banking error:", err));

app.use(middlewares());
app.use(router.routes());

app.on("error", (err, ctx) => {
  console.error(err);
});

app.listen(port, host, () => console.log(`listening on http://${host}:${port}`));
