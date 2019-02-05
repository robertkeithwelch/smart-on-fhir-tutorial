(function(window){
  window.extractData = function() {
    var ret = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart) {
      if (smart.hasOwnProperty('patient')) {

        $('#pract').html(smart.tokenResponse.user);
        $('#fhirid').html(smart.tokenResponse.patient);

        var patient = smart.patient;
        var pt = patient.read();

        $.when(pt, pr).fail(onError);

        $.when(pt, pr).done(function (patient) {

          var p = defaultPatient();
          p.id = patient.id;
          p.mrn = patient.identifier[0].value;
          p.pract = smart;

          ret.resolve(p);
        });
      } else {
        onError();
      }
    }


    FHIR.oauth2.ready(onReady, onError);

    return ret.promise();

  };

  function defaultPatient(){
    return {
      id: {value: ''},
      mrn: {value: ''},
      pracitioner: {value:''}
    };
  }


  window.drawVisualization = function(p) {

    $('#holder').show();
    $('#loading').hide();
//    $('#fhirid').html(p.id);
    $('#mrn').html(p.mrn);


    $.post( "http://localhost:1080/cernercontext/?partnerId=999999999999999-9999999999999", smart,
        function(data, textStatus, jqXHR)
        {
          //data - response from server
        }).fail(function(jqXHR, textStatus, errorThrown)
    {
      alert(textStatus);
    });

  };

})(window);
