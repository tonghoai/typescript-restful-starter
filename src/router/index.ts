import { Router } from "express";
import * as joi from "joi";
import Responses from "../response/response";
import UserController from "../controller/user";

class IndexRouter {
    private _router: Router;
    private _userController: UserController;
    private _response: Responses;

    constructor() {
        this._router = Router();
        this._userController = new UserController();
        this._response = new Responses();
    }

    get router(): Router {
        this._router.get("/", (req, res) => {
            return res.json(this._response.sendGoodStatus(undefined, "Express API"));
        });

        this._router.post("/login", (req, res) => {
            const body = req.body;
            const schema = joi.object().keys({
                username: joi.string().required(),
                password: joi.string().required(),
            });

            const { error } = joi.validate(body, schema);
            if (error) {
                return res.json(this._response.sendBadStatus(422, "Dữ liệu không hợp lệ"));
            }

            return this._userController.loginUser(body.username, body.password)
                .then((user) => {
                    return res.json(this._response.sendGoodStatus(user));
                })
                .catch((err) => {
                    return res
                        .status(err.output.statusCode || 500)
                        .json(this._response.sendBadStatus(432, err.output.payload.message));
                });

        });

        this._router.post("/register", (req, res) => {
            const body = req.body;
            const schema = joi.object().keys({
                username: joi.string().required(),
                password: joi.string().required(),
                repassword: joi.string().required(),
            });

            const { error } = joi.validate(body, schema);
            if (error) {
                return res.json(this._response.sendBadStatus(422, "Dữ liệu không hợp lệ"));
            }

            return this._userController.registerUser(body)
                .then((user) => {
                    return res.json(this._response.sendGoodStatus(user));
                })
                .catch((err) => {
                    return res
                        .status(err.output.statusCode || 500)
                        .json(this._response.sendBadStatus(432, err.output.payload.message));
                });

        });

        return this._router;
    }
}

export default IndexRouter;