$(function(){
    var mainWidth = $( "#mainDiv").width(); // Spliter Main Div Width
    $( "#mainDiv").width(mainWidth);
    var boxWidth; // Variable for store box width where working Jquery Resizer
    var extraWidth; // Variable for store box width where working Jquery Resizer
    var minWidth = 100; // Variable for store box minWidth where working Jquery Resizer
    var maxWidth; // Variable for store box maxwidth where working Jquery Resizer
    var exwid; // varibale for exwid for set width for first element
    var totleDiv = $('.spliter').length;
    $('.leftExtend').toggle(); // hide extand buttons at on load
    $('.rightExtend').toggle(); // hide extand button at on load 
    $('.spliter').width((mainWidth/totleDiv)-5);
    // spliter Resizer Logic
    $(".spliter").resizable({
      handles: 'e',
      helper: "ui-resizable-helper",
      grid:[10,10],
      minWidth : minWidth,
      start: function(e,ui) {
        console.log('resize start');
        var currentElement = ui.element; // get current element
        var nextElemnt = ui.element.next(); // get next element
        boxWidth = currentElement.width() + nextElemnt.width(); // get box width on start where working Jquery Resizer
        extraWidth = mainWidth - boxWidth; // get remaining width of main div on start where working Jquery Resizer
        minWidth = $( ".spliter" ).resizable( "option", "minWidth" ); 
        maxWidth = boxWidth - minWidth;
        // set logic for max or min width for current & next element of resizer div
        currentElement.css({
          'min-width':minWidth
        });
        nextElemnt.css({
          'min-width':minWidth
        });
        currentElement.css({
          'max-width':maxWidth
        });
        nextElemnt.css({
          'max-width':maxWidth
        });
      },
      resize: function(e,ui) {
        console.log('resize continue');
        e.preventDefault();
      },
      stop: function(e,ui) {
        console.log('resize stop');
        var currentElement = ui.element; // get current element
        var nextElemnt = ui.element.next();  // get next element
        nextElemnt.width(mainWidth- extraWidth - currentElement.width()); // set next element width
        $('#mainDiv').width(mainWidth);
      }
    });
    // left div collapse logic
    $('.leftCollapse').click(function(){
        var currentElement =   $(this).parent(); // get current element
        var nextElemnt =  $(this).parent().next(); // get next element
        var previousElement =  $(this).parent().prev(); // get previous element
        var currentElementWidth =   $(this).parent().width(); // get current element width
        var nextElemntWidth =  $(this).parent().next().width(); // get current element width
        var previousElementWidth =  $(this).parent().prev().width(); // get current element width
        // check if for exist previous div
        if(previousElementWidth && previousElementWidth >0) {
            // set logic for max or min width for current & previous element
            previousElement.css({
            'min-width' : 0
            });
            currentElement.css({
            'max-width' : previousElementWidth + currentElementWidth 
            });
            previousElement.css({
            'overflow':'auto'
            });
            if(previousElement.hasClass('firstClass')) {
                exwid = 0.5;
            } else  {
                exwid = 0;
            }
            currentElement.width(previousElementWidth + currentElementWidth - exwid);// set current element width 
            previousElement.width(0);// set previous element width 
            $(this).siblings('.leftExtend').toggle();  // show left extend button 
            $(this).toggle(); // hide left collapse button
            $(this).parent().prev().prev().resizable('disable'); // on collapse resizer disable
        } else {
            console.log('Previous Width is Undefined');
        }
    });
    // right div collapse logic
    $('.rightCollapse').click(function(){
        var currentElement = $(this).parent();// get current element
        var nextElemnt =  $(this).parent().next();// get next element
        var previousElement =  $(this).parent().prev();// get previous element
        var currentElementWidth =   $(this).parent().width();// get current element width
        var nextElemntWidth =  $(this).parent().next().width();// get next element width
        var previousElementWidth =  $(this).parent().prev().width();// get previous element width
        // check if for exist next div
        if(nextElemntWidth && nextElemntWidth > 0) {
            // set logic for max or min width for current & next element
            nextElemnt.css({
                'min-width' : 0
            });
            currentElement.css({
                'max-width' : nextElemntWidth + currentElementWidth
            });
            nextElemnt.css({
            'overflow':'auto'
            });
            currentElement.width(nextElemntWidth + currentElementWidth);// set current element width
            nextElemnt.width(0);// set next element width
            $(this).siblings('.rightExtend').toggle(); // show right extend button 
            $(this).toggle();// hide right Collapse button 
            $(this).parent().resizable('disable');// disable resizer
        } else {
            console.log('next Width is Undefined');
        }
    });
    // left div collapse logic
    $('.leftExtend').click(function(){
        var currentElement =   $(this).parent();// get current element
        var nextElemnt =  $(this).parent().next();// get next element
        var previousElement =  $(this).parent().prev();// get previous element
        var currentElementWidth =   $(this).parent().width();// get current element width
        var nextElemntWidth =  $(this).parent().next().width();// get next element width
        var previousElementWidth =  $(this).parent().prev().width();// get previous element width
        console.log('previousElementWidthEx',previousElementWidth)
        // check if for previous div collapse
        if(previousElementWidth == 0) {
            // set logic for max or min width for current & previous element
            previousElement.css({
            'min-width' : 0
            });
            currentElement.css({
            'max-width' : previousElementWidth + currentElementWidth 
            });
            previousElement.css({
            'overflow':'auto'
            });
            if(previousElement.hasClass('firstClass')) {
                exwid = 0.25;
            } else  {
                exwid = 0;
            }
            previousElement.width((previousElementWidth+currentElementWidth)/2 - exwid); // set equal with for previous & current element
            currentElement.width((previousElementWidth+currentElementWidth)/2 - exwid);
            $(this).siblings('.leftCollapse').toggle();// show collapse button
            $(this).toggle();// hide extend button
            $(this).parent().prev().prev().resizable('enable'); // on extend resizer enable
        }
    });
    // right div collapse logic
    $('.rightExtend').click(function(){
        var currentElement =   $(this).parent();// get current element
        var nextElemnt =  $(this).parent().next();// get next element
        var previousElement =  $(this).parent().prev();// get previous element
        var currentElementWidth =   $(this).parent().width();// get current element width
        var nextElemntWidth =  $(this).parent().next().width();// get next element width
        var previousElementWidth =  $(this).parent().prev().width();// get previous element width
        // check if for next div collapse
        if( nextElemntWidth <= 0) {
            // set logic for max or min width for current & previous element
            nextElemnt.css({
                'min-width' : 0
            });
            currentElement.css({
                'max-width' : nextElemntWidth + currentElementWidth
            });
            nextElemnt.css({
            'overflow':'auto'
            });
            nextElemnt.width((nextElemntWidth+currentElementWidth)/2); // set equal with for current & next element
            currentElement.width((nextElemntWidth+currentElementWidth)/2);
            $(this).siblings('.rightCollapse').toggle();// show collapse button
            $(this).toggle();// hide extend button
            $(this).parent().resizable('enable'); // on collapse resizer disable
        }
    });
    $(".spliter:last").resizable('disable');// disable last resizer border
    // $(".spliter:last").css({'border-right': 'none'});// hide last resizer border 
    //$(".spliter:last").width(mainWidth/totleDiv);// disable last resizer border 
});