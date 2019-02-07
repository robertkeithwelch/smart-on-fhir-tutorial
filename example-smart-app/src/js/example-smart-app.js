(function(window){
  window.extractData = function() {
    var ret = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart) {
        $('#fhirid').html(smart.tokenResponse.patient);

//        var patient = smart.patient;
        var practitioner = smart.user;
//        var pt = patient.read();
        var pr = practitioner.read();

//        $.when(pt).fail(onError);
        $.when(pr).fail(onError)

/*
        $.when(pt,pr).done(function (patient, practitioner) {

          var p = defaultPatient();
          p.id = patient.id;
          p.mrn = patient.identifier[0].value;
          
          $('#pract').html(practitioner.id) ;
          ret.resolve(p);
        });
*/
      
         $.when(pr).done(function (practitioner) {
          $('#pract').html(practitioner.id) ;
          
        });
    }


    FHIR.oauth2.ready(onReady, onError);

    return ret.promise();

  };

  function defaultPatient(){
    return {
      id: {value: ''},
      mrn: {value: ''},
    };
  }


  window.drawVisualization = function(p) {

    $('#holder').show();
    $('#loading').hide();
//    $('#fhirid').html(p.id);
    $('#mrn').html(p.mrn);
//    $('#pract').html(p.pract);
//    window.location = "http://localhost:1080/cernercontext/?partnerId=999999999999999-9999999999999";

  };

})(window);
