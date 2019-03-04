import * as jwt from "jsonwebtoken";

interface InterfaceJWTService {
    decode(token: string): InterfaceJWTDataDecode;

    encode(data: object): string;
}

interface InterfaceJWTDataDecode {
    user_id: number;
}

class JWT implements InterfaceJWTService {
    private _jwt: jwt;

    constructor() {
        this._jwt = jwt;
    }

    public decode(token: string): InterfaceJWTDataDecode {
        try {
            const decoded = this._jwt.verify(token, "tonghoai");
            return {
                user_id: decoded.id,
            };
        } catch (e) {
            throw new Error("error");
        }
    }

    public encode(data: object): string {
        const token = this._jwt.sign(data, "tonghoai", { expiresIn: 24 * 60 * 60 });
        return token;
    }
}

export default JWT;
