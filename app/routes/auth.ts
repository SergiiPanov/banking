import * as Router from "koa-joi-router";

import { signUp, signIn } from "../controllers/auth.controller";
const auth = Router();
auth.prefix("/auth");

auth.route({
  method: "get",
  path: "/login/:first_name",
  meta: {},
  validate: {},
  handler: signIn,
});

auth.route({
  method: "post",
  path: "/registration",
  meta: {},
  validate: {},
  handler: signUp,
});

export default () => auth;
