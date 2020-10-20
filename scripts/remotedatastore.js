(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    class RemoteDataStore {
        constructor(url) {
            console.log('running the DataStore function');
            if (!url) {
                throw new Error('No remote URL supplied.');
            }

            this.serverURL = url;
        }
        ajaxposthelper(type, url, val) {
            $.ajax({
                type: type,
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(val),
                success: function (response) {
                    console.log('function returned: ' + JSON.stringify(response));
                }
            });
        }
        ajaxhelper(type, url, cb) {
            $.ajax({
                type: type,
                url: url,
                contentType: 'application/json',
                success: function (response) {
                    console.log('function returned: ' + JSON.stringify(response));
                    if (cb !== undefined) {
                        cb(response);
                    }
                }
            });
        }
        add(key, val) {
            this.ajaxposthelper('POST', this.serverURL, val);
        }
        get(key, cb) {
            this.ajaxhelper('GET', this.serverURL + '/' + key, cb);
        }
        getAll(cb) {
            this.ajaxhelper('GET', this.serverURL, cb);
        }
        remove(key) {
            this.ajaxhelper('DELETE', this.serverURL + '/' + key);
        }
    }
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);