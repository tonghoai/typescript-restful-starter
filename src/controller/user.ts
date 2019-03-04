import * as Boom from "boom";
import { InterfaceRegisterUserModel, InterfaceResponseLoginUser, InterfaceUserModel, UserModel } from "../model/user";
import JWT from "../sercurity/jwt";

interface InterfaceUserController {
    loginUser(username: string, password: string): Promise<InterfaceResponseLoginUser>;
    getUser(options: { id?: number, username?: string }): Promise<InterfaceUserModel>;
    getUsers(): Promise<InterfaceUserModel[]>;
    registerUser(user: InterfaceRegisterUserModel): Promise<InterfaceUserModel>;
}

class UserController implements InterfaceUserController {
    private _userModel: UserModel;
    private _jwt: JWT;

    constructor() {
        this._userModel = new UserModel();
        this._jwt = new JWT();
    }

    public async loginUser(username: string, password: string): Promise<InterfaceResponseLoginUser> {
        let user: InterfaceUserModel;
        try {
            user = await this._userModel.getUser({ username });
        } catch (e) {
            throw Boom.badGateway("Có lỗi sảy ra");
        }

        if (!user) {
            throw Boom.notFound("Lỗi đăng nhập");
        }

        if (user.password !== password) {
            throw Boom.notFound("Lỗi đăng nhập");
        }

        const token = this._jwt.encode({
            id: user.id,
            username: user.username,
        });

        return {
            id: user.id,
            username: user.username,
            token,
        };
    }

    public async getUser(options: { id?: number, username?: string }): Promise<InterfaceUserModel> {
        const user = await this._userModel.getUser(options);
        return {
            id: user.id,
            username: user.username,
        };
    }

    public async getUsers(): Promise<InterfaceUserModel[]> {
        const users = await this._userModel.getUsers();
        return users.map((user) => {
            return {
                id: user.id,
                username: user.username,
            };
        });
    }

    public async registerUser(user: InterfaceRegisterUserModel): Promise<InterfaceUserModel> {
        if (user.password !== user.repassword) {
            throw Boom.notAcceptable("Lỗi đăng ký");
        }

        let resRegisterUser;
        try {
            delete user.repassword;
            resRegisterUser = await this._userModel.insertUser(user);
            return {
                id: resRegisterUser.id,
                username: resRegisterUser.username,
            };
        } catch (e) {
            throw Boom.badRequest("Có lỗi sảy ra");
        }
    }
}

export default UserController;
