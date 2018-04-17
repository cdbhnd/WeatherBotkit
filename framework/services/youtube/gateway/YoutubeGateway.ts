import * as Youtube from 'youtube-api'

export function search(query) {
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
                reject(err)
                return;
            }
            resolve(response);
        });
    });
}
