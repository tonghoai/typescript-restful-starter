import Response from "../response/response";
import JWT from "../sercurity/jwt";

interface InterfaceAuthService {
    auth(req: any, res: any, next: any): any;
}

class AuthMiddleware implements InterfaceAuthService {
    private _jwt: JWT;
    private _response: Response;

    constructor() {
        this._jwt = new JWT();
        this._response = new Response();
    }

    public auth(req: any, res: any, next: any): any {
        try {
            const data = this._jwt.decode(req.header("authorization"));
            req.user = {
                user_id: data.user_id,
            };
            return next();
        } catch (e) {
            return res.json(this._response.sendBadStatus(401, "unauthorized"));
        }
    }
}

export default AuthMiddleware;
