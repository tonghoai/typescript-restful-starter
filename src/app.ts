import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";

import IndexRouter from "./router/index";
import UserRouter from "./router/user";

class App {
    private _express: express.Express;

    constructor() {
        this._express = express();
        this.mountRoutes();
    }

    get express(): any {
        return this._express;
    }

    public mountRoutes(): void {
        this.useMiddleware();
        this.mountIndexRoutes();
        this.mountUserRoutes();
    }

    public useMiddleware(): void {
        this._express.use(morgan("tiny"));
        this._express.use(bodyParser.json());
    }

    /* Index Routes */
    public mountIndexRoutes(): void {
        const indexRouter = new IndexRouter();
        this._express.use("/", indexRouter.router);
    }

    /* User Routes */
    public mountUserRoutes(): void {
        const userRouter = new UserRouter();
        this._express.use("/user", userRouter.router);
    }
}

export default App;
