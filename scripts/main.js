(function (window) {
    'use strict';
    
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]'; // CHOOSE ONLY ONE...
    var SERVER_URL = 'https://co.audstanley.com/coffeeorders';    // if running on the shared server

    //Deployd server
    //var SERVER_URL = 'http://localhost:2403/coffeeorders'; // if running locally
    var App = window.App;
    var Truck = App.Truck;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    // var truck = new Truck('ncc-1701', new DataStore());
    var truck = new Truck('ncc-1701', remoteDS);
    window.truck = truck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
        truck.createOrder.call(truck, data);
        checkList.addRow.call(checkList, data);
    });
    console.log(formHandler);

    formHandler.addInputHandler(Validation.isCompanyEmail);
})(window);