const request = require("request");

const getService = (url) => {
    return new Promise((resolve, reject) => {
        try {
            request(url, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ response, body });
                }
            });
        } catch(err) {
            reject(err);
        }
        
    });
}

module.exports = {
    getService
}