
var config = {
  apiKey: "AIzaSyAhZaI3W_tUQT9xPS7dNdDZeFAJDgNVulI",
  authDomain: "trains-54190.firebaseapp.com",
  databaseURL: "https://trains-54190.firebaseio.com",
  projectId: "trains-54190",
  storageBucket: "",
  messagingSenderId: "52250660904"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submitbutton").on("click", function () {
  event.preventDefault();
  var newTrain = $("#trainname").val().trim();
  var destination = $("#destination").val().trim();
  var trainFrequency = $("#frequency").val().trim();
  var trainTime = $("#traintime").val().trim();

  console.log("trainFrequency: " + trainFrequency);
  console.log("traintime: " + trainTime);



  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  var tRemainder = diffTime % trainFrequency;
  var minutesAway = trainFrequency - tRemainder;
  var nextArrival = moment().add(minutesAway, "minutes");


  console.log(trainTimeConverted);
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  console.log("DIFFERENCE IN TIME: " + diffTime);
  console.log("REMAINDER: " + tRemainder);
  console.log("MINUTES TILL TRAIN: " + minutesAway);
  console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));


database.ref().push({
    newTrain: newTrain,
    destination: destination,
    trainFrequency: trainFrequency,
    trainTime: trainTime,
    minutesAway:minutesAway, 
    nextArrival: moment(nextArrival).format("hh:mm")
  });
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val().newTrain);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().trainFrequency);
  console.log(childSnapshot.val().trainTime);
  var newRow = $('<tr>');


  $(newRow).append("<td class='trainname'>" + childSnapshot.val().newTrain +
    " </td><td>" + childSnapshot.val().destination +
    " </td><td>" + childSnapshot.val().trainFrequency +
    " </td><td>" + childSnapshot.val().nextArrival +
    " </td><td>" + childSnapshot.val().minutesAway +
    " </td>");

  $("tbody").append(newRow);
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

