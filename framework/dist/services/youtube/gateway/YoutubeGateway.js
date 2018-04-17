"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Youtube = require("youtube-api");
function search(query) {
    return new Promise(function (resolve, reject) {
        Youtube.authenticate({
            type: "key",
            key: "AIzaSyDsE6M4hcoHucqKSNFSfEVhfFzEk2PhtYg"
        });
        Youtube.search.list({
            part: 'id,snippet',
            q: query
        }, function (err, response) {
            if (err) {
                reject(err);
                return;
            }
            resolve(response);
        });
    });
}
exports.search = search;
//# sourceMappingURL=YoutubeGateway.js.map