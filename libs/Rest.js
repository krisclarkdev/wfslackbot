/* Rest.js */

'use strict';

let wavefront_key = process.env.WAVEFRONT_TOKEN;

const Request = require('request');

module.exports.doPost = function(url) {
    let options = {
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + wavefront_key
        }
    };
    // Return new promise
    return new Promise(function(resolve, reject) {
        // Do async job
        Request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    });
};