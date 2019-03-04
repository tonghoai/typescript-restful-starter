import * as Boom from "boom";
import * as sequelize from "sequelize";
import Sequelize from "../database/sequelize";
import JWT from "../sercurity/jwt";

export interface InterfaceUserModel {
    id: number;
    username: string;
    password?: string;
}

export interface InterfaceRegisterUserModel extends InterfaceUserModel {
    password: string;
    repassword: string;
}

export interface InterfaceResponseLoginUser extends InterfaceUserModel {
    token: string;
}

export interface InterfaceUserService {
    getUser(options: { id?: number, username?: string }): Promise<InterfaceUserModel>;

    getUsers(): Promise<InterfaceUserModel[]>;

    insertUser(user: InterfaceRegisterUserModel): Promise<InterfaceUserModel>;

    updateUser(user: InterfaceRegisterUserModel): Promise<InterfaceUserModel>;
}

export class UserModel implements InterfaceUserService {
    private _userSequelize: sequelize.Model<any, any>;

    constructor() {
        this._userSequelize = new Sequelize().user;
    }

    public async getUsers(): Promise<InterfaceUserModel[]> {
        const users = await this._userSequelize.findAll({
            attributes: ["id", "username"],
        });

        return users.map((user) => {
            return {
                id: user.id,
                username: user.username,
            };
        });
    }

    public async getUser(options: { id?: number; username?: string }): Promise<InterfaceUserModel> {
        const { id, username } = options;
        const condition = {
            id: undefined,
            username: undefined
        };

        if (id) {
            condition.id = id;
        }

        if (username) {
            condition.username = username;
        }
        const query = this._userSequelize.findOne({
            where: condition
        })

        const result = await query;
        return {
            id: result.id,
            username: result.username,
            password: result.password,
        };
    }

    public async insertUser(user: InterfaceRegisterUserModel): Promise<InterfaceUserModel> {
        const resInsertUser = await this._userSequelize.create(user)

        return {
            id: resInsertUser.id,
            username: user.username,
        };
    }

    public async updateUser(user: InterfaceRegisterUserModel): Promise<InterfaceUserModel> {
        const dataUserUpdate = user;
        const id = user.id;
        delete dataUserUpdate.id;
        delete dataUserUpdate.username;
        await this._userSequelize.update(dataUserUpdate, { where: { id } })

        return {
            id,
            username: user.username,
        };
    }
}
