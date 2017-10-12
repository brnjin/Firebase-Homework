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

//Easier access to data in firebase
var database = firebase.database();

//On click function to get user input 
$("#add-train").on("click", function(event) {
	event.preventDefault();
	//variables to save user input
	var trainName = $('#train-input').val();
	var trainDestination = $('#destination-input').val();
	trainTime = $('#time-input').val();
	var trainFrequency = $('#frequency-input').val();

	console.log(trainName);

	//Object variable to save data into firebase
	var newTrain = {
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
	};

	//pushing up the object variable to firebase
	database.ref().push(newTrain);

	//Clears the input data 
	$('#train-input').val("");
	$('#destination-input').val("");
	$('#time-input').val("");
	$('#frequency-input').val("");
});

//gets the data from firebase and saves it into a variable
database.ref().on("child_added", function(childsnapshot){
	console.log(childsnapshot.val());
	var trainName = childsnapshot.val().name;
	var trainDestination = childsnapshot.val().destination;
	var trainTime = childsnapshot.val().time;
	var trainFrequency = childsnapshot.val().frequency;
	console.log(trainFrequency + "Here");

	//variables to set up for the time calculations
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
	
	//displays the data from firebase into table by using tr and td tags
	$('#data-display > tbody').append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td><td>");
})


