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

export function searchOne(query) {
    return search(query)
        .then(function (result) {
            if (result.items.length) {
                return {
                    kind: result.items[0].id.kind,
                    videoId: result.items[0].id.videoId,
                    url: 'https://www.youtube.com/watch?v=' + result.items[0].id.videoId,
                    title: result.items[0].snippet.title,
                    description: result.items[0].snippet.description,
                }
            } else {
                return null;
            }
        })
}
