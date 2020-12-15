import { ParameterizedContext } from "koa";
import { createNewUser, getAuthUser } from "../services";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";

export const signIn = async (ctx: ParameterizedContext) => {
  const token = await getAuthUser(ctx.params.first_name, ctx.query.password, ctx.query.bank_name);
  ctx.ok(token);
};

export const signUp = async (ctx: ParameterizedContext) => {
  const { body } = ctx.request;
  //const sKeys = JSON.parse(process.env.NODE_APP_API_SECRET_KEY)
  //const finder = Object.keys(sKeys)
  //const bank = finder.filter(key => key === body.bank)[0]
  //const trueKey = sKeys[bank]
  //const decodedToken = jwt.verify(body.body,truekey)
  const savedUser = await createNewUser(body);
  ctx.ok(savedUser);
};
