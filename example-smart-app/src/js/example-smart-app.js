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
        practObj.id = "605926"; //smart.tokenResponse.user;

        smart.api.read( practObj ).then( (pract) => {
              var identifiers = pract.data.identifier;
          
              for( var index=0 ; i<identifiers.length ; i++ )
              {
                if( identifiers[i].coding[0].code == "PRN" )
                {
                  $('#pract').html( identifiers[i].value );
                }
              }
        })

        $.when(pt).fail(onError);
        $.when(pt).done(function (patient) {

          var p = defaultPatient();
          p.id = patient.id;
          p.mrn = patient.identifier[0].value;
          ret.resolve(p);
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
    $('#fhirid').html(p.id);
    $('#mrn').html(p.mrn);

//    window.location = "http://localhost:1080/cernercontext/?partnerId=999999999999999-9999999999999";

  };

})(window);
