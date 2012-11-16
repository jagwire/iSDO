function createRowsForStates(states) {
    console.log("CREATING INITIAL ROWS FOR STATES!");
    var columnHeadingsRow = "<tr class=\"column-headings-row\"><td></td></tr>";
    
    $(columnHeadingsRow).appendTo("#states-table");
    for(var i in states) {
        var row =   "<tr class=\"state-row\" id=\""+i+"-state-table-row\">";
        row +=      "<td>"+i+"</td>";
        row +=      "</tr>";
        
        $(row).appendTo("#states-table");
    }
}

function createRowsForEvents(events) {
    
    console.log("CREATING INITIAL ROWS FOR EVENTS!");
    var columnHeadingsRow = "<tr class=\"column-headings-row\"><td></td></tr>";
    $(columnHeadingsRow).appendTo("#events-table");
    
    
    for(var i in events) {
        var row = "<tr class=\"event-row\" id=\""+i+"-event-table-row\">";
        row += "<td>"+i+"</td>";
        row += "</tr>";
        
        $(row).appendTo("#events-table");
    }
}

function reportIntervalsData(intervals) {
    console.log("REPORTING DATA!");
    console.log("NUMBER OF INTERVALS: "+intervals.length);
    
    /*
    * Each iteration of this loop adds an additional column to the table. First the heading
    * is created and then the data for the heading is appended to their respective rows.
    */
    for(var i in intervals) {
        console.log("PROCESSING INTERVAL: "+i);
        //add interval column to right of table
        var columnHeading = "<td>"+i+"</td>";
        $(columnHeading).appendTo(".column-headings-row");
        
        
        console.log("NUMBER OF STATES: "+Object.keys(intervals[i].states).length);
        //for every state in this interval
        for(var s in intervals[i].states) {
            console.log("PROCESSING STATE: "+s);
            var symbol = "_";
            //check if the state was marked true for this interval
            if(intervals[i].states[s] == true) {
                symbol = "X";
            } else {
                symbol = " ";
            }
            console.log("writing "+symbol+" for interval "+i);
            //add this state as part of the new column to the right of the table
            var append = "<td>"+symbol+"</td>";
            $(append).appendTo("#"+s+"-state-table-row");
        }
        
        //for every tally of events in this interval
        for(var e in intervals[i].events) {
            console.log("PROCESSING EVENT: "+e);
            
            //craft the cell containing the tally of this event's occurrences for this interval
            var append = "<td>"+intervals[i].events[e]+"</td>";
            
            console.log("writing "+intervals[i].events[e]+" for "+e+" in interval "+i);
            //add this tally as part of the new column to the right of the table
            $(append).appendTo("#"+e+"-event-table-row");
        }
        
    }
}




function iterateOverIntervals(intervals) {
	var intervalCount = 0;
	
	console.log("ITERATING "+intervals.length+" INTERVALS");
	
	for(var i in intervals) {
	
		//pre-phase
		intervalCount += 1;
		
		//add the interval to our column headings
		csv_file.addColumn(intervalCount);
				
		var states = intervals[i].states;
		
		for(var state in states) {
			console.log("PROCESSING STATE: " +state+"->"+states[state]+" for interval: " +intervalCount);
			processState(intervalCount, state, states[state]);
		}
		
		var events = intervals[i].events;
		
		for(var event in events) {
			processEvent(intervalCount, event, events[event]);
		}
	}
	csv_file.joinFile();
	$("#report-content").append("<p> DATA: "+csv_file.file+"</p>");
	console.log(csv_file.file);
	
}

function processState(interval_index, state_index, value) {
	var symbol = "_";
	
	if(value == true) {
		symbol = "X";
	} else {
		symbol = " ";
	}
	
	var tableCell = "<td>"+symbol+"</td>";
	$(tableCell).appendTo("#"+index+"-state-table-row");
	csv_file.updateValue(state_index, interval_index, symbol);
	console.log(state_index+"," +interval_index+"="+value); 
	
}

function processEvent(interval_index, event_index, value) {
	var tableCell = "<td>"+value+"</td>";
	
	$(tableCell).appendTo("#"+value+"-event-table-row");
	csv_file.updateValue(event_index, interval_index, value);

}

//var columnHeadings = " ,1,2,3,4,5";
//var rows = new Object();
//rows[CCV] = "CCV, , , , , ,";

/*function createRowsForStates_CCV(states, rows_object) {
	for(var s in states) {
		rows_object[s] = " ";
	}
}

function createRowsForEvents_CCV(events, rows_object) {
	for(var e in events) {
		rows_object[e] = " ";
	}
}

*/















