"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromBody = void 0;
function getDataFromBody(req) {
    return new Promise(function (resolve, reject) {
        try {
            var data_1 = "";
            req.on("data", function (chunck) {
                data_1 += chunck.toString();
            });
            req.on("end", function () { return resolve(data_1); });
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.getDataFromBody = getDataFromBody;
