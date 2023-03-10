var Phone           = "",
    call            = "",
    callLegInfo     = "",
    lastheader      = "",
    moc             = "",
    remoteView="";

// SIP Message formatter
  var localCanRenegotiateRTC = function() {
    return JsSIP.rtcninja.canRenegotiate;
  };
// lead
var peerconnection_config = { 
      iceServers: [ {
        urls: [ "stun:49.248.16.102:3478","stun:stun.l.google.com:19302"]
      } ],
      gatheringTimeout: 2000 };

// var crnr      = '',
//     crid      = '',
//     ltid      = '',
//     ltnm      = '',
//     cnid      = '',
//     cnnm      = '',
//     prid      = '',
//     prnm      = '',
//     atid      = '',
//     crud      = '',
//     rfud      = '',
//     leg_type  = '',
//     atNm      = '';

// var sessionUuid         = "",
//     agentExtn           = "",
//     transferAgentExtn   = "",
//     ConfereceAgentExtn  = "";

// var callTimeInSec     = 0,
//     updateAgentTimer  = "";


// var usersip = "9010";
function jsSipLog(level, category, label, content) {

  var jsSipConsoler  = JSON.stringify({
    "TIME"      : Date.create().format('{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}'),
    "LEVEL"     : level,
    "CATEGORY"  : category,
    "LABEL"     : label,
    "CONTENT"   : content
  }, null, 2);

  console.log(jsSipConsoler);
  return;
}

function phonestart( agentExtn, ws_servers, uri) {



  configuration = {
    ws_servers                        : ws_servers,
    uri                               : uri.substring(0,4) + agentExtn + uri.substring(4),
    password                          : "Wh@TdAf#*kIsT#iS",
    connection_recovery_max_interval  : 1000000,
    connection_recovery_min_interval  : 1000000,
    no_answer_timeout                 : 30,
    register                          : true,
    register_expires                  : 180,
    stun_servers                      : "",
    use_preloaded_route               : false,
    trace_sip                         : true,
    log                               : {
      builtinEnabled  : true,
      level           : 'error',
      connector       : jsSipLog
    }
  };
  console.log( "WS server " + ws_servers);
  console.log( "usersip ::" + uri.substring(0,4) + agentExtn + uri.substring(4));

	Phone = new JsSIP.UA(configuration);

  Phone.on('connected', function(e){

	  console.log("WS Connected");
    try {
        WebSocketConnect();
      }
      catch (ex) {
        // console.log("WS Connected ");
      }
	});
  
  Phone.on('registered', function(e){

	  console.log("SIP Registered");
    try {
      userRegistered();
    }
    catch (ex) {
      console.log("User Registered but user registered function not found");
    }
  });

  Phone.on('disconnected', function(e){

    console.log("WS Disconnected");
    //alert('WebSocket Disconnected');
    console.log("SIP Registered");
    try {
      userDisconnect();
    }
    catch (ex) {
      console.log("User Disconnect function not found");
    }
  });

  Phone.on("unregistered",function() {
      console.log("This Phone is unregistered.");
      //alert('SIP UnRegistered');
      try {
        userUnregistered();
      }
      catch (ex) {
        console.log("User unregistered and user unregistered function not found");
      }
	});
  
  
  Phone.on('registrationFailed', function(e) {
    console.log("User registrationFailed");
    console.log(e);
    //alert('Registeration Failed');
    try {
      userRegisterationFailed();
    }
    catch (ex) {
      console.log("User registrationFailed function not found");
    }
  });

  Phone.start();

  Phone.on('newRTCSession', function(e) {

    console.log("Phone Start");
    console.log(e);

    call        = e.session;
    lastheader  = call.request.headers;

    audioCallAnswerObject = {
        pcConfig: peerconnection_config,
        // TMP:
        mediaConstraints: { audio: true, video:false },
        extraHeaders: [
          'X-Can-Renegotiate: ' + String(JsSIP.rtcninja.canRenegotiate)
        ],
        rtcOfferConstraints: {
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 0
        },
      }
  	// autoAnswering the incoming call to agent
        call.answer(audioCallAnswerObject);
        console.log(audioCallAnswerObject);

		remoteView = document.getElementById('remoteView');


    call.on('addstream', function(e) {
      console.log("CAll Connected:stream");
      console.log('Tryit: addstream()');
      remoteStream = e.stream;
      console.log(remoteStream);
      remoteView = JsSIP.rtcninja.attachMediaStream(remoteView,remoteStream);
      //remoteView.src=window.URL.createObjectURL(remoteStream);
        try {
        callAddStream();
        }
        catch (ex) {
        // console.log("WS Connected ");
        }
        // remoteView.src = window.URL.createObjectURL(remoteStream);
        // remoteView = JsSIP.rtcninja.attachMediaStream(remoteView, remoteStream);
        // remoteView = JsSIP.rtcninja.attachMediaStream(remoteView, remoteStream);
    });

    call.on('reinvite', function(e)
    {
    console.log("reinvite");
    });

     call.on('update', function(e)
    {
    console.log("update");
    });

    call.on('refer', function(e)
    {
    console.log("refer");
    });

     call.on('replaces', function(e)
    {
    console.log("replaces");
    });

    call.on('removestream', function(e)
    {
    console.log("removestream");
    });

    call.on('confirmed',function(e){
    console.log("confirmed")
    remoteView = JsSIP.rtcninja.attachMediaStream(remoteView,remoteStream);
    try {
        //callConfirmed();
        console.log(call.request.headers.Callleginfo);
        jsonStringCallLegInfo = call.request.headers.Callleginfo[0].raw;
        jsonErrorFlag         = 0;
        callConfirmed( jsonStringCallLegInfo );
      }
      catch (ex) {
        // console.log("WS Connected ");
      }
    });

		call.on('started',function(e){
        console.log("started")
      try {
        callStarted();
        
      }
      catch (ex) {
        // console.log("WS Connected ");
      }
      // call.getLocalStreams()[0];
      // call.getRemoteStreams()[0];
	  	//Attach the streams to the views if it exists.
			// if ( call.getLocalStreams().length > 0) {
  	// 		remoteView.src=window.URL.createObjectURL(call.getLocalStreams()[0]);
			// }

			// if ( call.getRemoteStreams().length > 0) {
  	// 		remoteView.src=window.URL.createObjectURL(call.getRemoteStreams()[0]);
			// }
    });

    call.on('ended',function(e) {
      console.log("Call Ended.");
      try {

        jsonStringCallLegInfo = call.request.headers.Callleginfo[0].raw;
        jsonErrorFlag         = 0;
      } catch(err) {

        jsonStringCallLegInfo = '{"info":[{"customerPhone":"ASK CUSTOMER"},{"customerId":"1138439"},{"leadsetId":"1"},{"leadsetName":"default"},{"campaignId":"7"},{"campaignName":"testCampaign"},{"processId":"98"},{"processName":"testProcessForAamir"},{"agentId":"9"},{"crUd":"67890"},{"rfUd":"12345"},{"legType":"agent"},{"snUd":"12345"},{"otUd":"67890"},{"atEn":"9999"},{"txSt":"none"},{"moc":"Auto"}]}';
        jsonErrorFlag         = 1;
      }

      callEnd( jsonStringCallLegInfo );

      alert('Call Ended');
    });

    call.on('failed',function(e) {
			console.log("Call Failed.");
      try {
        callFailed();
      }
      catch (ex) {
        // console.log("WS Connected ");
      }
		});
  }); // Phone on newRTCSession function end
}

function endcall(e) {

	try {
    call.terminate();
    var jsonStringCallLegInfo = "";
  }
  catch (ex) {
    console.log("Call end function not found or call terminate fail");
  }
}

function updateStream(){

  setTimeout(function(){ remoteView = JsSIP.rtcninja.attachMediaStream(remoteView, remoteStream); 
  }, 6000);
}


