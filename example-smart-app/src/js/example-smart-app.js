(function(window){
  window.extractData = function() {
    var ret = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart)  {
      if (smart.hasOwnProperty('patient')) {
        var patient = smart.patient;
        var pt = patient.read();
        
        $.when(pt).fail(onError);

        $.when(pt).done(function(patient) {
          var mrn = patient.identifier.filter(function (x) { return x.type.text.toUpperCase() === 'MRN'; })[0].value;
          window.location = 'https://idp-dev.healthviewanalytics.com/account/login?returnUrl=https%3A%2F%2Fembeddedanalytics-dev.healthviewanalytics.com%2Fpatient%2F' + mrn + '%2Frisk&user=portal&provider=usercernersmartappoauth2';
        });
      } else {
        onError();
      }
    }

    FHIR.oauth2.ready(onReady, onError);
    return ret.promise();

  };
})(window);
