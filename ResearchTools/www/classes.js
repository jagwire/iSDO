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
	console.log("Observation: DECLARING VARIABLES");
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
    var self = this;
    
    for(var counter = 0; counter < 240; counter++) {
    	var ns = namespaces.SCI;
    	self.intervals.push(new Interval(ns.level1_states,
    								     ns.level2_states,
    								     ns.default_events;
    }
    
    this.addInterval = function() {
        console.log("ADDING INTERVAL!");
        var ns = namespaces.SCI;
        
        self.intervals.push(new Interval(ns.level1_states,
                                                       ns.level2_states,
                                                       ns.default_events));
    }
}


function CSVRow(id) {
	
	var self = this;
	this.id = id;
	this.elements = new Array();
	this.elements.push(id);
	
	this.addData = function(value) {
		self.elements.push(value);
	}
	
	this.rowToString = function() {
		return self.elements.join() + "\n";
	}
	
	this.updateData = function(index, value) {
		self.elements[index] = value;
	}

}

function CSVFile(level1, level2, events) {
	var self = this;
	this.level1 = level1;
	this.level2 = level2;
	this.events = events;
	
	this.rows = new Object();
	this.file = " ";
	//this.columns = " ";
	
	//initialize our first row as column headers. As such the initial row cell
	//will be blank since it is indexed by 0 and interval 1 will show 1.
	//this.rows.push(new CSVRow(" "));
	this.rows["blank"] = new CSVRow(" ");
	
	//initialize our level 1 rows for appending
	for(var key in level1) {
		self.rows[key] = new CSVRow(key);
		
	}
	
	//initialize our level 2 rows for appending
	for(var key in level2) {
		self.rows[key] = new CSVRow(key);
	}
	
	//initialize our event rows for appending
	for(var key in events) {
		self.rows[key] = new CSVRow(key);//"0";
		
		//self.rows.push(new CSVRow(key));
	}
	
	
	this.appendToRow = function(key, value) {
		self.rows[key].addData(value);
	}
	
	this.addColumn = function(value) {

		//add the column header
		self.rows["blank"].addData(value);
		
		//add default data for all other rows
		//for(var i in self.rows) {
		for(var i = 1; i <= self.rows.length; i++) {	
			self.rows[i].addData(" ");
		}
		
	}
	
	this.updateValue = function(row, column, value) {
		console.log("updating "+row+","+column+"->"+value);
		self.rows[row].updateData(column, value);
	}
	
	this.joinFile = function() {
//		self.file += columns;
//		self.file += "\n";
		
//		for(var key in rows) {
//			self.file += rows[key];
//			self.file += "\n";
//		}
		
		for(var index in self.rows) {
			self.file += self.rows[index].rowToString();
		}
	}
	
	
}