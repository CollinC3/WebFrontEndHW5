(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var firebaseConfig = {
        apiKey: "AIzaSyA0zG0ZNKrHu0GZUKbQdP7tDzbPx3vBM1I",
        authDomain: "coffeerun-eb68f.firebaseapp.com",
        databaseURL: "https://coffeerun-eb68f.firebaseio.com",
        projectId: "coffeerun-eb68f",
        storageBucket: "coffeerun-eb68f.appspot.com",
        messagingSenderId: "208265123287",
        appId: "1:208265123287:web:99c9843492ead435816792",
        measurementId: "G-LSKDTKXRP1"
    };

    firebase.initializeApp(firebaseConfig);
    var firestore = firebase.firestore();

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
        
        addtoFirebase(key, val) {
            firestore.collection("coffeeOrders").doc(key).set({
                coffee: val.coffee,
                emailAddress: val.emailAddress,
                size: val.size,
                flavor: val.flavor,
                strength: val.strength
            }).then(function() {
                console.log("Success");
            }).catch(function(error) {
                console.log("Got an error: ", error);
            });
        } 
        
        removefromFirebase(key) {
            firestore.collection("coffeeOrders").doc(key).delete().then(function() {
                console.log("Document deleted");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
        add(key, val) {
            this.addtoFirebase(key, val);
        }
        get(key, cb) {
            console.log("Hello" + cb);
            this.ajaxhelper('GET', this.serverURL + '/' + key, cb);
        }
        getAll(cb) {
            console.log(cb);
            this.ajaxhelper('GET', this.serverURL, cb);
        }
        remove(key) {
            this.removefromFirebase(key);
        }
    }
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);