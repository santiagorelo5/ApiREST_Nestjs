export class MongoMock {
    constructor(private _response: any[] = []) { }

    public set response(data: any[]) {
        this._response = data;
    }

    find() {
        return this._response;
    }
    findById() {
        return this._response[0];
    }
    create() {
        return this._response[0];
    }

    findOneAndUpdate() {
        return this._response[0];
    }
}