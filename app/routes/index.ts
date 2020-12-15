import * as Router from "koa-router";
import authRouters from "./auth";

const router = new Router({ prefix: "/api" });

router.use(authRouters().middleware());


export default router;
