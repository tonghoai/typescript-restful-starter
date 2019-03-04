interface InterfaceResponseStatus {
    statusCode: number;
    message: string;
    data: object;
    error: string;
}

interface InterfaceResponseService {
    sendGoodStatus(data: object, message: string, error: string, statusCode: number): InterfaceResponseStatus;

    sendBadStatus(statusCode: number, message: string, data: object, error: string): InterfaceResponseStatus;
}

class Responses implements InterfaceResponseService {
    public sendGoodStatus(
        data: object,
        message: string = "",
        error: string = "",
        statusCode: number = 200): InterfaceResponseStatus {
        return {
            statusCode,
            message,
            data,
            error,
        };
    }

    public sendBadStatus(
        statusCode: number = 500,
        message: string = "",
        data: object = {},
        error: string = ""): InterfaceResponseStatus {
        return {
            statusCode,
            message,
            data,
            error,
        };
    }
}

export default Responses;
