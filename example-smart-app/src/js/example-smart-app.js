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
          
          switch(clientId) {
            case '04700180-5ff2-4eeb-963e-15fd859ba994': // Azure Dev simulator Cerner App
              window.location = 'https://idp-dev.healthviewanalytics.com/account/login?returnUrl=https%3A%2F%2Fembeddedanalytics-dev.healthviewanalytics.com%2F%23%2Fpatient%2F' + mrn + '%2Frisk&user=portal&provider=usercernersmartappoauth2';
              break;
            case 'f08c6f2c-1469-4805-98b0-0e2c14718fa1': // Localhost simulator Cerner App
              window.location = 'https://localhost:44379/account/login?returnUrl=http%3A%2F%2Flocalhost%3A3000%2F%23%2Fpatient%2F' + mrn + '%2Frisk&user=portal&provider=test1cernersmartappoauth2';
              break;
            case '4ed79774-438b-4c40-9a9d-7df67e2f92d0': // OnPrem Dev simulator Cerner App
              window.location = 'https://medicalcopilot.dev.lumedx.com/medicalcopilotidp/account/login?returnUrl=https%3A%2F%2Fmedicalcopilot.dev.lumedx.com%2F%23%2Fpatient%2F' + mrn + '%2Frisk&user=portal&provider=testcernersmartappoauth2';
              break;
            case 'ce726c87-2d1d-4824-9c4c-5e5598492a47': // Azure Test simulator Cerner App
              window.location = 'https://idp-test.healthviewanalytics.com/account/login?returnUrl=https%3A%2F%2Fembeddedanalytics-test.healthviewanalytics.com%2F%23%2Fpatient%2F' + mrn + '%2Frisk&user=portal&provider=cernersmartappoauth2';
              break;
            case '55ac901a-8f14-4c6b-94d0-739eb84eb77c': // OnPrem Test simulator Cerner App
              window.location = 'https://medicalcoint.dev.lumedx.com/medicalcopilotidp/account/login?returnUrl=https%3A%2F%2Fmedicalcoint.dev.lumedx.com%2F%23%2Fpatient%2F' + mrn + '%2Frisk&user=portal&provider=cernersmartappoauth2';
              break;
            case 'c34f0c65-d249-45f6-8b46-d979bad37bc5': // OnPrem Demo simulator Cerner App
              window.location = 'https://blvmcdemo.dev.lumedx.com/medicalcopilotidp/account/login?returnUrl=https%3A%2F%2Fblvmcdemo.dev.lumedx.com%2F%23%2Fpatient%2F' + mrn + '%2Frisk&user=portal&provider=cernersmartappoauth2';
              break;
          }          
        });
      } else {
        onError();
      }
    }

    FHIR.oauth2.ready(onReady, onError);
    return ret.promise();

  };
})(window);
