import * as sequelize from "sequelize";
import Config from "../config/config";

class Sequelize {
    private _config: Config;
    private _sequelize: sequelize.Sequelize;
    private _USER_TABLE: string;

    constructor() {
        this._config = new Config();
        this._sequelize = new sequelize(this._config.DB_MYSQL, { logging: false });
        this._USER_TABLE = "user";
    }

    get sequelize(): any {
        const _sequelize = new sequelize(this._config.DB_MYSQL);
        return _sequelize;
    }

    public ping(): void {
        const _sequelize = this.sequelize;
        _sequelize.authenticate()
            .then(() => {
                // tslint:disable-next-line:no-console
                console.log("Mysql connection has been established successfully.");
            })
            .catch((err: any) => {
                // tslint:disable-next-line:no-console
                console.error("Unable to connect to the database:", err);
            });
    }

    public syncTable(force: boolean): void {
        this.user.sync({ force });
    }

    get user(): sequelize.Model<any, any> {
        const User = this._sequelize.define(this._USER_TABLE, {
            id: {
                type: sequelize.INTEGER(11),
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: sequelize.STRING(50),
            },
            password: {
                type: sequelize.STRING(100),
            },
        });

        return User;
    }
}

export default Sequelize;
