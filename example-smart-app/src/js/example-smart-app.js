(function(window){
  window.extractData = function() {
    var ret = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart) {
        $('#fhirid').html(smart.tokenResponse.patient);

        var patient = smart.patient;
        var pt = patient.read();
      
        var practObj = {};
        practObj.type = "Practitioner";
        practObj.id = smart.tokenResponse.user;

        smart.api.read( practObj ).then( (pract) => {
              $('#pract').html( JSON.stringify( pract ) );
        })
            .catch((err) => {
              $('#pract').html( err.data );
        });

        $.when(pt).fail(onError);


        $.when(pt).done(function (patient) {

          var p = defaultPatient();
          p.id = patient.id;
          p.mrn = patient.identifier[0].value;
          ret.resolve(p);
        });

      
//         pr.done(function (practitioner) {
//          $('#pract').html(practitioner.id) ;          
//        });
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
    $('#fhirid').html(p.id);
    $('#mrn').html(p.mrn);

//    window.location = "http://localhost:1080/cernercontext/?partnerId=999999999999999-9999999999999";

  };

})(window);
