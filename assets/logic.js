  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC4fjX1ikp4tLrsTMN6_HZjLmxL8I1D4tc",
    authDomain: "train-scheduler-deb6a.firebaseapp.com",
    databaseURL: "https://train-scheduler-deb6a.firebaseio.com",
    projectId: "train-scheduler-deb6a",
    storageBucket: "train-scheduler-deb6a.appspot.com",
    messagingSenderId: "1041272222118"
  };
  firebase.initializeApp(config);

//   establish connection to the firebase..
 var database = firebase.database();

$("#add-train").on("click", function(event) {
	event.preventDefault();
	
	var trainName = $("#train-name-input").val().trim();
	var trainDestination = $("#destination-input").val().trim();
	var trainTime = $("#first-train-input").val().trim();
	var trainFrequency = $("#frequency-input").val().trim();
	
	// Code for the push
	var newTrain = ({
	  
	  name: trainName,
	  destination: trainDestination,
	  time: trainTime,
	  frequency: trainFrequency,
	})
	database.ref().push(newTrain);
  
	alert("Train successfully added");
  
	// Clears all of the text-boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-input").val("");
	$("#frequency-input").val("");
});

 database.ref().on("child_added", function(events) {

    // Variables from database values
    var trainName = events.val();
    var trainDestination = events.val();
    var trainFrequency = events.val();
	var trainTime = events.val();

	var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");

    var difference = moment().diff(moment(firstTimeConverted), "minutes");

    var remainder = difference % trainFrequency;

    var minutesTillTrain = trainFrequency - remainder;

    var nextTrain = moment().add(minutesTillTrain, "minutes");

	var tableRow = $("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");

    $("#gimmeTrainTimes").append(tableRow);
 });

 console.log()