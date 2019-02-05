(function(window){
  window.extractData = function() {
    var ret = $.Deferred();

    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart)  {
      if (smart.hasOwnProperty('patient')) {
        
        var practitioner = "none";
        
        $('#pract').html( smart.tokenResponse.user );
        $('#fhirid').html( smart.tokenResponse.patient);
        
        var patient = smart.patient;
        var pt = patient.read();

        $.when(pt, pr).fail(onError);

        $.when(pt, pr).done(function(patient) {

          var p = defaultPatient();
          p.id = patient.id;
          p.mrn = patient.identifier[0].value;;
          p.pract = smart;
          
    var req =$.ajax({
        url: "http://localhost:1080/cernercontext/?partnerId=999999999999999-9999999999999",
        type: "POST",
        dataType: "json",
        data: smart,
        error: function (request, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    }).then( function(result) { 
		var optionsSource = $('#partnerSelectSource');
		var optionsTarget = $('#partnerSelectTarget');
		
        for( var i=0 ; i<result.customers.length; i++ )
        {		
        	optionsSource.append(new Option(result.customers[i], result.customers[i]));
        	optionsTarget.append(new Option(result.customers[i], result.customers[i]));
        }

        if( result.customers.length > 0 )
        {
	        loadInstancesByPartnerSource( result.customers[0] );
	        loadInstancesByPartnerTarget( result.customers[0] );   
	        $("#partnerSelectSource").val( result.customers[0] );
	        $("#partnerSelectTarget").val( result.customers[0] );
	    	$.session.set("SourcePartner", result.customers[0] );
	    	$.session.set("TargetPartner", result.customers[0] );
        	syncBreadCrumbsWithSession();	    	
        }
    });          

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
    $('#mrn').html(p.mrn)
    
  };

})(window);
