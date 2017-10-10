console.log("hello")

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
	var trainTime = $('#time-input').val();
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
	$('#desination-input').val("");
	$('#time-input').val("");
	$('#frequency-input').val("");
});

database.ref().on("child_added", function(childsnapshot){
	console.log(childsnapshot.val());
})