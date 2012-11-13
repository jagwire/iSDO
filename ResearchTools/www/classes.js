console.log("Classes loaded!");
/* TIMER MODEL */
function Timer(time_in_seconds, intervalFunction) {
    this.intervalTime = time_in_seconds;
    //this.intervalId = window.setInterval(_interval(), time_in_seconds);
    
    this.start = function() {
        this.intervalId = window.setInterval(this._interval, this.intervalTime);
    }
    
    this.pause = function() {
        window.clearInterval(this.intervalId);
    }
    
    this.resume = function() {
        this.intervalId = window.setInterval(this._interval, this.intervalTime);
    }
    
    this.stop = function() {
        window.clearInterval(this.intervalId);
        this.elapsedSeconds = 0;
        this.elapsedMinutes = 0;
    }
    
    this.elapsedSeconds = 0;
    this.elapsedMinutes = 0;
    
    this._interval = function() {
        //console.log(elapsedSeconds);
        //elapsedSeconds += 1;
        
        intervalFunction();
    };
}

function Interval(level1, level2, events) {
    this.states = new Object();
    this.events = new Object();
    
    //for every state provided
    for(var i in this.states) {
        //create a key in states with the given state name
        this.states[states[i]] = false;
    }
    
    //for every event provided
    for(var i in this.events) {
        //create a key in states with the given
        this.events[events[i]] = 0;
    }
    
    //tally an event for this interval;
    this.incrementEvent = function(event) {
        this.events[event] += 1;
    }
    
    //apply a state for this interval
    this.applyState = function(state) {
        this.states[state] = true;
    }
}

function Observation(name, number, observer, intervalLength, popupLength, namespace) {
    this.intervals = new Array();
    this.subjectName = name;
    this.subjectNumber = number;
    this.observerName = observer;
    this.currentInterval = 1;
    
    //should be either 15 or 30
    this.intervalLength = intervalLength;
    
    //shoudl be either 3, 5, or 7
    this.popupLength = popupLength;
    
    //the namespace of the
    this.namespace = namespace;
    
    this.addInterval = function() {
        console.log("ADDING INTERVAL!");
        var ns = namespaces.SCI;
        
        this.intervals.push(new Interval(ns.level1_states,
                                                       ns.level2_states,
                                                       ns.default_events));
    }
}