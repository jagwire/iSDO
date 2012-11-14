console.log("UTILS LOADED!");

function startObservation() {
    if(!observationStarted) {
        
        //console.log("FORM VALUE: "+$(".timeSlider option:selected").val())
        //var thisFrequency = 1000 * parseInt($(".timeSlider option:selected").val());
        // console.log("FREQUENCY AT TIME OF START OBSERVATION:" +frequency);
        observationStarted = true;
        intervalHandle = new Timer(frequency, _interval);
        timerHandle = new Timer(1000, _timer);
        
        intervalHandle.start();
        timerHandle.start();
        
        //window.location.href="#";
    }
}

function stopObservation() {
    intervalHandle.stop();
    timerHandle.stop();
    
    clearInterval(intervalHandle);
    clearInterval(timerHandle);
    
    $.mobile.changePage('report.html');
}

function hideBehaviorDialog() {
    //$("#interval-behaviors-dialog").dialog('close');
    $('#recurring-sample-popup').popup("close");
    //handle interval data here
    intervalHandle.resume();
    timerHandle.resume();
    
    popupTimerHandle.stop();
}

function hideInitialPopup() {
    $("#initial-sample-popup").popup("close");
    popupTimerHandle.stop();
    startObservation();
}

function _interval() {
    
    console.log("RECORDING DATA!");
    record_events();
    record_states();
    
    console.log("PAUSING TIMERS!");
    intervalHandle.pause();
    timerHandle.pause();
    clearIntervalStates();
    
    seconds = 0;
    minutes = 0;
    
    $('.interval-label').text(" Interval "+current_interval);
    beep(2);
    $('#recurring-sample-popup').popup("open");
    
    
    currentObservation.currentInterval += 1;
    currentObservation.addInterval();
    
    //    session.intervals[current_interval] = new Object();
    //    session.intervals[current_interval].behaviors = new Array();
    
    clearTally();
    
    popupTimerHandle.start();
    
}

function setTotalSeconds(total) {
    totalSeconds = total;
    console.log("SETTING TOTAL SECONDS: "+totalSeconds)
}

function _popupTimer() {
    //decrement counter in recurring popup
    elapsedSeconds += 1;
    //var totalSeconds = $("input[name=time-length]:checked").val();
    //console.log("TIME LENGTH: "+totalSeconds);
    var secondsRemaining = 10;
    if(!first) {
        secondsRemaining = totalSeconds - elapsedSeconds;
        $("#initial-time-remaining").text("Time Remaining: "+secondsRemaining);
    } else {
      //  console.log("TOTAL SECONDS: "+totalSeconds+" - ELAPSED SECONDS: "+elapsedSeconds);
        
        secondsRemaining = totalSeconds - elapsedSeconds;
        //console.log("SECONDS REMAINING: "+secondsRemaining);
        $("#time-remaining").text("Time Remaining: "+secondsRemaining);
    }
    
    //if it reaches 0, hide the popup
    if(secondsRemaining <= 0) {
        if(!first) {
            first = true;
            hideInitialPopup();
            elapsedSeconds = 0;
            return;
        } else {
            elapsedSeconds = 0;
            hideBehaviorDialog();
        }
    }
}

function _timer() {
    //calculate elapsed time
    seconds += 1;
    runningSeconds += 1;
    //alert(seconds);
    var mins = 0;
    var secs = 0;
    var minsDisplay;
    var secsDisplay;
    
    mins = Math.floor(seconds/60);
    runningMinutes = Math.floor(runningSeconds/60);
    
    if(mins > 0) {
        minutes = mins;
        secs = seconds % 60;
    } else {
        secs = seconds % 60;
    }
    
    //var mins_display = "";
    if(mins < 10) {
        minsDisplay = "0"+mins;
    } else {
        minsDisplay = mins;
    }
    
    //var secs_display = "";
    if(secs < 10) {
        secsDisplay = "0"+secs;
    } else {
        secsDisplay = secs;
    }
    
    var time_display = minsDisplay + ":"+secsDisplay;
    
    //display elapsed time
    $("#time").text(time_display);
    $("#running-time").text(formatTime(runningMinutes, runningSeconds));
}

function formatTime(minutes, seconds) {
    var ms = minutes;
    var ss = seconds;
    if(minutes < 10) {
        ms = "0"+minutes;
    }
    
    if(seconds < 10) {
        ss = "0"+seconds;
    }
    
    return ms+":"+ss;
}

//put states into PAGE
function load_states(namespace) {
    for(var i in namespace["level1_states"]) {
        var states = namespace["level1_states"];
        var str = " ";
        str += "<label for=\" "+states[i]+" \">"+states[i]+"</label>";
        str += "<input data-mini=\"true\" class=\"clearable\" type=\"radio\" name=\"group1\" id=\" "+states[i]+" \" value=\""+i+" \" />";
        
        $(str).appendTo("#start-level1");
        $(str).appendTo("#recur-level1");
    }
    
    for(var i in namespace["level2_states"]) {
        var states = namespace["level2_states"];
        var str = " ";
        str += "<label for=\" "+states[i]+" \">"+states[i]+"</label>";
        str += "<input data-mini=\"true\" class=\"clearable\"type=\"radio\" name=\"group2\" id=\" "+states[i]+" \" value=\""+i+" \" />";
        
        $(str).appendTo("#start-level2");
        $(str).appendTo("#recur-level2");
    }
    
    $("input[type='radio']").prop("type", "radio").checkboxradio();
    $("#start-level1").controlgroup("create");
    $("#start-level2").controlgroup("create");
    $("#recur-level1").controlgroup("create");
    $("#recur-level2").controlgroup("create");
    
}

//put events into PAGE
function load_events(namespace) {
    for(var i in namespace["default_events"]) {
        var events = namespace["default_events"];
        
        var str = "<td><button data-code=\""+i+"\" data-mini=\"true\" class=\"event-button\" onclick=tally(\""+i+"\")>"+events[i]+"</button></td>";
        $(str).appendTo("#event-button-row");
        
        var id = "\""+i+"-tally\"";
        console.log("BUILDING ID: "+id);
        var eventrow = "<td class=\"tally-box\" align=\"center\" id="+id+">0</td>"
        $(eventrow).appendTo("#event-label-row");
        
    }
    
    $(".event-button").button().trigger("create");
    
}

//put events into DOM, currentObservation
function record_events() {
    $(".event-button").each(function(index, e) {
                            var label = $(this).data("code");
                            
                            var occurrences = $("#"+label+"-tally").text();
                            
                            var curInt = currentObservation.currentInterval;
                            curInt -= 1;
                            
                            currentObservation.intervals[curInt].events[label] = occurrences;
                            console.log("RECORDING "+occurrences+" FOR "+label+" IN INTERVAL: "+curInt);
                            });
}

//put states into DOM, currentObservation
function record_states() {
    $("input:radio[name=group1]:checked").each(function() {
                                               
                                               //current interval
                                               var curInt = currentObservation.currentInterval;
                                               var state = $(this).val();
                                               curInt -= 1;
                                               console.log("RECORDING "+true+" FOR "+state+" IN INTERVAL: "+curInt);
                                               currentObservation.intervals[curInt].states[state] = true;
                                               });
}

function testbeep() {
    var beep_file = new Media("beep.wav",
    						 function() {
    						 	console.log("SUCCESS!");
    						 },
    						  function() {
    						  	console.log("ERROR!"); });
    beep_file.play();
}

function testnotify() {
    // navigator.notifiction.beep(1);
}

function email(data) {
    window.plugins.emailComposer.showEmailComposer("test", "test", "pympnotiq@gmail.com", "x.com", "y.com", false, data);
    
}

function tally(str) {
    
    /*
     * beeps and vibrations not supported on iPad!
     *
     */
    //   navigator.notification.beep(1);
    //  navigator.notification.vibrate(500);
    //alert("!MEEP");
    //console.log("SEARCING FOR ID: "+str+"-tally");
    beep(2);
    var tick = $("#"+str+"-tally").text();
    
    //console.log("CURRENT TICK VALUE: "+tick);
    var newTick = parseInt(tick)+1;
    
    //console.log("NEW TICK VALUE: "+newTick);
    
    $("#"+str+"-tally").text(newTick);
}

function clearTally() {
    $(".tally-box").text("0");
}

function clearIntervalStates() {
    //  alert("!MEEP");
    $('.clearable').prop('checked', false);
    $("input[type='radio']").prop("checked",false).checkboxradio("refresh");
}

function beep(numberOfBeeps) {
    for(var i = 0; i < numberOfBeeps; i++) {
        //beep_file.play();
    	testbeep();
    }
}
