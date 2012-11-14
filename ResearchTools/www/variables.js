var intervalTimer = Timer(15, function() {
                          //do stuff
                          });

var popupTimer = Timer(5, function() {
                       //count down
                       });

var currentObservation;

//to denote what interval we are on
var current_interval = 0;

//to hold our javascript interval object
var intervalHandle;

//to hold our javascript interval timer object
var timerHandle;

var popupTimerHandle;

//the amount of seconds elapsed
var seconds = 0;

//the amount of minutes elapsed
var minutes = 0;

var runningSeconds = 0;
var runningMinutes = 0;

var observationStarted = false;

//for popup timer
var elapsedSeconds = 0;
var first = false;
var totalSeconds = 1000;

//for loading

var show = false;

var frequency = 15000;




/* Default Data */

var namespaces = ({
                  
	SCI : {
		level1_states: {
        	MO: "Modeling",
            GP: "Guided Practice",
        	NP: "Naturalistic Practice",
            PB: "Progressive Building",
                  		PLC: "Previously Learning Skills",
                  		OTHER: "Other"
                  
                  	},
                  
                  	level2_states: {
                  		FE: "Facial Expressions",
                  		ASB: "Appropriate Speaker Behaviors",
                  		ALB: "Appropriate Learning Behaviors",
                  		TT: "Turn Taking",
                  		ER: "Emotional Ranges",
                  		RP: "Recognizing Perspectives",
                  		PI: "Problem Identification",
                  		MPS: "Multiple Problem Solutions",
                  		OTHER: "Other"
                  
                  },
                  
                  default_events: {
                  VVE: "Verbal/Visual Expectations",
                  SVF: "Specific Verbal Feedback",
                  EXT: "Extension",
                  PRO: "Prompting",
                  SM: "Self-Monitor",
                  EI: "Explicit Instruction",
                  CS: "Cognitive Strategies"
                  }
                  },
                  Ryan: {
                  level1_states: {
                  HAPPY: "Happy",
                  SAD: "Sad"
                  
                  },
                  
                  level2_states: {
                  CALM: "Calm",
                  THOUGHT: "Thoughful"
                  },
                  
                  default_events: {
                  SPK: "Spoke",
                  MOV: "Moved"
                  }
                  
                  
                  }
                  
                  
});


var testObservationData = new Observation("Joe", "1234", "Ryan", 15, 7, namespaces.SCI);
var testSCI = namespaces.SCI;
testObservationData.intervals.push(new Interval(testSCI.level1_states, testSCI.leve2_states, testSCI.default_events));
testObservationData.intervals.push(new Interval(testSCI.level1_states, testSCI.leve2_states, testSCI.default_events));
testObservationData.intervals.push(new Interval(testSCI.level1_states, testSCI.leve2_states, testSCI.default_events));

testObservationData.intervals[0].states["MO"] = true;
testObservationData.intervals[0].states["FE"] = true;
testObservationData.intervals[0].events["VVE"] = 20;

testObservationData.intervals[1].states["MO"] = true;
testObservationData.intervals[1].states["FE"] = false;
testObservationData.intervals[1].events["VVE"] = 10;

testObservationData.intervals[2].states["MO"] = true;
testObservationData.intervals[2].states["FE"] = true;
testObservationData.intervals[2].events["VVE"] = 30;

var csv_file = new CSVFile(testSCI.level1_states, testSCI.level2_states, testSCI.default_events);

function createObservation() {
    
    console.log("CREATING OBSERVATION!");
    //create the observation
    currentObservation = new Observation($("#subject-name").val(),
                                         $("#subject-number").val(),
                                         $("#observer-name").val(),
                                         $("select.timeSlider").val(),
                                         $("input:radio[name=time-length]:checked").val(),
                                         namespaces.SCI);
    
    console.log("ADDING INTERVAL!");
    currentObservation.addInterval();
    
    console.log("subject-name: "+$("#subject-name").val()+
                "\nsubject-number: "+$("#subject-number").val()+
                "\nobserver-name: "+$("#observer-name").val()+
                "\ninterval freq: "+$("select.timeSlider").val()+
                "\npopup interfal countdown: "+$("input:radio[name=time-length]:checked").val());
    
    console.log("SWITING PAGE TO OBSERVATION-STAGE!");
    //now switch the page to the observation-stage
    $.mobile.changePage("observation-stage.html");
}

/*console.log("CREATING BEEP_FILE!");
var beep_file = new Media("beep.wav", function() { 
										console.log("beep_file creation SUCCESS!");
									}, function() {
										console.log("beep_file creation ERROR!");
									 });*/
