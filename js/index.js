$(document).ready(function(){
  
  var audio = new Audio("https://s1.vocaroo.com/media/download_temp/Vocaroo_s1FlDyxbS6mn.mp3");

   var breakTime = $(".break").text();
  $("#minus-break").on('click', function(){
    breakTime = $(".break").text();
    if(breakTime-1>=0){
          $(".break").text(--breakTime);
    }
    else{
      alert("Error: Time cannot be negative!")
    }
  });
  
  $("#plus-break").on('click', function(){
    breakTime = $(".break").text();
    $(".break").text(++breakTime);
  });
  /*---------------------------break buttons end-------*/
   

  var workTime = $(".work").text();
  $("#minus-work").on('click', function(){
    workTime = $(".work").text();
    if(workTime-1 >=0){
      $(".work").text(--workTime);
      $(".timer").text(workTime + ":00");
    }else{
       alert("Error: Time cannot be negative!")
    }
    
  });
  
  $("#plus-work").on('click', function(){
    workTime = $(".work").text();
    $(".work").text(++workTime);
     $(".timer").text(workTime + ":00");
  });
  /*-------------------------work buttons end-------*/
  
  
    var work = true; //if work session or break session
    var timeRunning = false; //if timer is on or off
    var x; //to store setInterval
    var time; //to store time for current session (work or break)
  
  
    $(".timer").on('click', function(){
    workTime = $(".work").text();
    breakTime = $(".break").text();
    
    //if work-> then time=workTime, else time = breakTime
    time = work ? workTime : breakTime;

    //disable increment and decrement buttons when time is on
    $("section .btn").toggleClass("disabled");
    //calculate time for current session in seconds
    var totalSeconds = time *60;
    
    
    if(timeRunning == false){
      timeRunning=true;
      $(".timer").addClass("on"); //enable border for timer box
      x = setInterval(function(){
      
      totalSeconds--;
      
      //calculate mins and seconds
      var mins = Math.floor(totalSeconds/60);
			var secs = Math.floor(totalSeconds -  mins * 60 );
      
      //get double digits when seconds is between 0 to 9
      if(secs < 10)  {
        secs = "0" + secs;
      }
       
      /***********If timer complete**********/
      if(totalSeconds < 0){
      	clearInterval(x); //disable timer
        audio.play(); //play sound
        timeRunning = false;
        $(".timer").removeClass("on"); //remove border from timer box
        //set timer box to next session's time
        if(work){
          $(".timer").text(breakTime + ":00");
        }
        else{
          $(".timer").text(workTime + ":00");
        }
        work = !work;
      }
      /***********timer running********/
      else{
        $(".timer").text(mins + ":" + secs);
      }
      
    }, 1000);
    }
      //if timer button is clicked twice-> then disable the timer and reset timer
    else{
      $(".timer").removeClass("on");
      clearInterval(x);
      $(".timer").text(workTime + ":00");
      timeRunning = false;
    }

  });

});