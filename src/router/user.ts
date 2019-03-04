import { Router } from "express";
import * as joi from "joi";
import AuthMiddleware from "../middleware/auth";
import Responses from "../response/response";
import UserController from "../controller/user";

class UserRouter {
    private _router: Router;
    private _authMiddleware: AuthMiddleware;
    private _userController: UserController;
    private _response: Responses;

    constructor() {
        this._router = Router();
        this._authMiddleware = new AuthMiddleware();
        this._userController = new UserController();
        this._response = new Responses();
    }

    get router(): Router {
        this._router.get("/", (req, res, next) => this._authMiddleware.auth(req, res, next), async (req, res) => {
            try {
                const user = await this._userController.getUser({});
                return res.json(this._response.sendGoodStatus({ user }));
            } catch (err) {
                return res
                    .status(err.output.statusCode || 500)
                    .json(this._response.sendBadStatus(432, err.output.payload.message));
            }
        });

        this._router.get("/user", async (req, res) => {
            try {
                const user = await this._userController.getUser({});
                return res.json(this._response.sendGoodStatus({ user }));
            } catch (err) {
                return res
                    .status(err.output.statusCode || 500)
                    .json(this._response.sendBadStatus(432, err.output.payload.message));
            }
        });

        this._router.get("/users", async (req, res) => {
            try {
                const users = await this._userController.getUsers();
                return res.json(this._response.sendGoodStatus({ users }));
            } catch (err) {
                return res
                    .status(err.output.statusCode || 500)
                    .json(this._response.sendBadStatus(432, err.output.payload.message));
            }
        });

        return this._router;
    }
}

export default UserRouter