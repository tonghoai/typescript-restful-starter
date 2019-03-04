import * as dotenv from "dotenv";
import App from "./app";
import Config from "./config/config";
import Sequelize from "./database/sequelize";

class Server {
    private _server: App;
    private _config: Config;
    private _sequelize: Sequelize;
    private __server: any;

    constructor() {
        dotenv.config();
        this._config = new Config();

        this._sequelize = new Sequelize();
        this._sequelize.ping();
        this.syncTable(this._config.SYNC_MYSQL_TABLE);

        this._server = new App();
    }

    private syncTable(force: boolean): void {
        this._sequelize.syncTable(force);
    }

    get server(): App {
        this.__server = this._server.express;
        this.__server.listen(this._config.PORT);
        console.log(`server run at ${this._config.PORT}`);
        return this.__server;
    }
}

const server = new Server();
export default server.server;