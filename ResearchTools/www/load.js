/* DOCUMENT LOADING ZONE */

$("#observe").live('pageshow', function(event, ui) {
    //alert("observe loaded!");
    //$(".timeSlider").slider();
    $(".timeSlider").bind("change", function(event, ui) {
                                         
        frequency = 1000 * parseInt($(".timeSlider option:selected").val());
        console.log("FREQUENCY: "+frequency);
                          
        //  alert($(".timeSlider").val());
    });
});

$("#stage").live('pageshow', function(event, ui) {
    
    var name = $("#subject-name").val();
    var number = $("#subject-number").val();
    var observer = $("#observer-name").val();
    
    load_states(namespaces.SCI);
    load_events(namespaces.SCI);
    if(show === false) {

        $('#initial-sample-popup').popup("open");
                 console.log("starting popup timer!");
        popupTimerHandle = new Timer(1000, _popupTimer);
        popupTimerHandle.start();
        show = true;
    }
});

$("#report-content").live('pageshow', function(event, ui) {
                         console.log("LOADING REPORT!");
                         createRowsForStates(namespaces.SCI.level1_states);
                         createRowsForStates(namespaces.SCI.level2_states);
                         createRowsForEvents(namespaces.SCI.default_events);
                         
                         reportIntervalsData(testObservationData.intervals);
});

