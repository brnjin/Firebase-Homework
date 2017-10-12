// Initialize Firebase
var config = {
	apiKey: "AIzaSyCE77Y2VC449HOXk62WMJny_a6FebhalZk",
	authDomain: "first-firebase-project-b7b70.firebaseapp.com",
	databaseURL: "https://first-firebase-project-b7b70.firebaseio.com",
	projectId: "first-firebase-project-b7b70",
	storageBucket: "first-firebase-project-b7b70.appspot.com",
	messagingSenderId: "833392960256"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function(event) {
	event.preventDefault();

	var trainName = $('#train-input').val();
	var trainDestination = $('#destination-input').val();
	trainTime = $('#time-input').val();
	var trainFrequency = $('#frequency-input').val();

	console.log(trainName);

	var newTrain = {
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
	};

	database.ref().push(newTrain);

	$('#train-input').val("");
	$('#destination-input').val("");
	$('#time-input').val("");
	$('#frequency-input').val("");
});
database.ref().on("child_added", function(childsnapshot){
	console.log(childsnapshot.val());
	var trainName = childsnapshot.val().name;
	var trainDestination = childsnapshot.val().destination;
	var trainTime = childsnapshot.val().time;
	var trainFrequency = childsnapshot.val().frequency;
	console.log(trainFrequency + "Here");

	var tFrequency = trainFrequency;
	var firstTime = trainTime;
	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % tFrequency;
	console.log(tRemainder);
	// Minute Until Train 
	var tMinutesTillTrain = tFrequency  - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
	
	$('#data-display > tbody').append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td><td>");
})


