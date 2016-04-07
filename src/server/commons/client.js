/*
 * Copyright 2015 Alexander Pustovalov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs-extra';
import request from 'request';

let authenticationToken = null;

export function setAuthenticationToken(token) {
    this.authenticationToken = token;
}

export function post(url, requestBody) {
    return new Promise((resolve, reject) => {
        var requestOptions = {
            uri: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'X-Auth-Token': authenticationToken
            },
            method: 'POST',
            json: true,
            body: requestBody,
            followAllRedirects: false
        };
        try {
            request(
                requestOptions,
                (error, response, body) => {
                    if (response) {

                        if (response.statusCode !== 200) {
                            if (response.statusCode >= 301 && response.statusCode <= 302) {
                                post(response.headers.location, requestBody)
                                    .then(data => {
                                        resolve(data);
                                    })
                                    .catch(err => {
                                        reject(err);
                                    });
                            } else if (response.statusCode === 403) {
                                reject('User account is not signed in. Requested operation is forbidden. Please sign in to Structor Market.');
                            } else if (response.statusCode === 401) {
                                reject('User account is not authenticated. Please sign in to Structor Market.');
                            } else {
                                reject('Got error code ' + response.statusCode + '. Status: ' + response.statusMessage + '. Message: ' + JSON.stringify(body));
                            }
                        } else if (error) {
                            reject('Error connection to ' + url + '. ' + (error.message ? error.message : error.toString()));
                        } else {
                            if (body.error === true) {
                                let errorMessage = "Error: ";
                                if (body.errors && body.errors.length > 0) {
                                    body.errors.map(errorStr => {
                                        errorMessage += errorStr + ', ';
                                    });
                                }
                                reject(errorMessage.substr(0, errorMessage.length - 2));
                            } else {
                                resolve(body);
                            }
                        }
                    } else {
                        reject('Error connection to ' + url);
                    }
                }
            )
        } catch (e) {
            reject(e.message ? e.message : e.toString());
        }
    });
}

export function get(url) {
    return new Promise((resolve, reject) => {
        var requestOptions = {
            headers: {
                'Accept': 'application/json',
                'X-Auth-Token': authenticationToken
            },
            uri: url,
            method: 'GET',
            json: true,
            followAllRedirects: false
        };
        try {
            request(
                requestOptions,
                (error, response, body) => {
                    if (response) {
                        if (response.statusCode !== 200) {
                            if (response.statusCode >= 301 && response.statusCode <= 302) {
                                get(response.headers.location)
                                    .then(data => {
                                        resolve(data);
                                    })
                                    .catch(err => {
                                        reject(err);
                                    });
                            } else if (response.statusCode === 403) {
                                reject('User account is not signed in. Requested operation is forbidden. Please sign in to Structor Market.');
                            } else if (response.statusCode === 401) {
                                reject('User account is not authenticated. Please sign in to Structor Market.');
                            } else {
                                reject('Got error code ' + response.statusCode + '. Status: ' + response.statusMessage + '. Message: ' + JSON.stringify(body));
                            }
                        } else if (error) {
                            reject('Error connection to ' + url + ". " + (error.message ? error.message : error.toString()));
                        } else {
                            resolve(body);
                        }
                    } else {
                        reject('Error connection to ' + url);
                    }
                }
            )
        } catch (e) {
            reject(error.message ? error.message : error.toString());
        }
    });
}

export function getText(url) {
    return new Promise((resolve, reject) => {
        var requestOptions = {
            headers: {
                'X-Auth-Token': authenticationToken
            },
            uri: url,
            method: 'GET',
            json: false
        };
        try {
            request(
                requestOptions,
                (error, response, body) => {
                    if (response) {
                        if (response.statusCode !== 200) {
                            if (response.statusCode >= 301 && response.statusCode <= 302) {
                                getText(response.headers.location)
                                    .then(data => {
                                        resolve(data);
                                    })
                                    .catch(err => {
                                        reject(err);
                                    });
                            } else if (response.statusCode === 403) {
                                reject('User account is not signed in. Requested operation is forbidden. Please sign in to Structor Market.');
                            } else if (response.statusCode === 401) {
                                reject('User account is not authenticated. Please sign in to Structor Market.');
                            } else {
                                reject('Got error code ' + response.statusCode + '. Status: ' + response.statusMessage + '. Message: ' + JSON.stringify(body));
                            }
                        } else if (error) {
                            reject('Error connection to ' + url + '. ' + (error.message ? error.message : error.toString()));
                        } else {
                            resolve(body);
                        }
                    } else {
                        reject('Error connection to ' + url);
                    }
                }
            )
        } catch (e) {
            reject(e.message ? e.message : e.toString());
        }
    });
}

export function download(url, requestBody) {
    return new Promise((resolve, reject) => {
        let requestOptions = {
            uri: url,
            headers: {
                'Content-type': 'application/json',
                'X-Auth-Token': authenticationToken
            },
            method: 'POST',
            body: JSON.stringify(requestBody),
            encoding: null
        };
        try {
            request(
                requestOptions,
                (error, response, body) => {
                    if (response) {
                        if (response.statusCode !== 200) {
                            if (response.statusCode >= 301 && response.statusCode <= 302) {
                                download(response.headers.location, requestBody)
                                    .then(data => {
                                        resolve(data);
                                    })
                                    .catch(err => {
                                        reject(err);
                                    });
                            } else if (response.statusCode === 403) {
                                reject('User account is not signed in. Requested operation is forbidden. Please sign in to Structor Market.');
                            } else if (response.statusCode === 401) {
                                reject('User account is not authenticated. Please sign in to Structor Market.');
                            } else {
                                reject('Got error code ' + response.statusCode + '. Status: ' + response.statusMessage + '. Message: ' + JSON.stringify(body));
                            }
                        } else if (error) {
                            reject('Error connection to ' + url + '. ' + (error.message ? error.message : error.toString()));
                        } else {
                            resolve(body);
                        }
                    } else {
                        reject('Error connection to ' + url);
                    }
                }
            )
        } catch (e) {
            reject(e.message ? e.message : e.toString());
        }
    });

}

export function downloadGet(url) {
    return new Promise((resolve, reject) => {
        let requestOptions = {
            uri: url,
            method: 'GET',
            strictSSL: false,
            headers: {
                'User-Agent': 'request'
            },
            encoding: null
        };
        try {
            request(
                requestOptions,
                (error, response, body) => {
                    if (response) {
                        if (response.statusCode !== 200) {
                            if (response.statusCode >= 301 && response.statusCode <= 302) {
                                downloadGet(response.headers.location)
                                    .then(data => {
                                        resolve(data);
                                    })
                                    .catch(err => {
                                        reject(err);
                                    });
                            } else if (response.statusCode === 403) {
                                reject('User account is not signed in. Requested operation is forbidden.');
                            } else if (response.statusCode === 401) {
                                reject('User account is not authenticated.');
                            } else {
                                reject('Got error code ' + response.statusCode + '. Error: ' + response.statusMessage);
                            }
                        } else if (error) {
                            reject('Error connection to ' + url + '. ' + (error.message ? error.message : error.toString()));
                        } else {
                            resolve(body);
                        }
                    } else {
                        reject('Error connection to ' + url);
                    }
                }
            )
        } catch (e) {
            reject(e.message ? e.message : e.toString());
        }
    });

}

//upload(option, isAuth = false) {
//    return new Promise( (resolve, reject) => {
//        const url = option.url;
//        let requestOptions = {
//            uri: url,
//            method: 'POST'
//        };
//        if (isAuth) {
//            if (this.sm.getIn('client.user') && this.sm.getIn('client.pass')) {
//                requestOptions.auth = {
//                    'user': this.sm.getIn('client.user'),
//                    'pass': this.sm.getIn('client.pass'),
//                    'sendImmediately': true
//                }
//            } else {
//                reject('Specify user name and password or create new account.');
//            }
//        }
//        requestOptions.formData = {};
//        if (option.filePaths && option.filePaths.length > 0) {
//            option.filePaths.map( (filePath, index) => {
//                requestOptions.formData['file_' + index] = fs.createReadStream(filePath);
//            });
//        } else {
//            reject('Files for uploading were not specified.');
//        }
//        try {
//            request(
//                requestOptions,
//                (error, response, body) => {
//                    if (response) {
//                        if (response.statusCode !== 200) {
//                            if (response.statusCode === 401) {
//                                reject('User account is not authenticated. Please sign in to Structor Market.');
//                            } else {
//                                reject('Got error code ' + response.statusCode + ' processing request to ' + url);
//                            }
//                        } else if (error) {
//                            reject('Error connection to ' + this.sm.getIn('client.serviceURL'));
//                        } else if (body) {
//                            if (body.error === true) {
//                                let errorMessage = "Error: ";
//                                if(body.errors && body.errors.length > 0){
//                                    body.errors.map( errorStr => {
//                                        errorMessage += errorStr + ', ';
//                                    });
//                                }
//                                reject(errorMessage.substr(0, errorMessage.length - 2));
//                            } else {
//                                resolve(body.data);
//                            }
//                        }
//                    } else {
//                        reject('Error connection to ' + this.sm.getIn('client.serviceURL'));
//                    }
//                }
//            )
//        } catch (e) {
//            reject('Error: ' + e.message);
//        }
//    });
//}

