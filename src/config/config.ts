class Config {
    private _DB_MYSQL: string;
    private _PORT: number;
    private _SYNC_MYSQL_TABLE: boolean;

    constructor() {
        this._DB_MYSQL = process.env.DB_MYSQl || "";
        this._PORT = Number.parseInt(process.env.PORT, 10) || 3000;
        this._SYNC_MYSQL_TABLE = (process.env.SYNC_MYSQL_TABLE === "true");
    }

    get DB_MYSQL(): string {
        return this._DB_MYSQL;
    }

    get PORT(): number {
        return this._PORT;
    }

    get SYNC_MYSQL_TABLE(): boolean {
        return this._SYNC_MYSQL_TABLE;
    }
}

export default Config;
