
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDahpCBh75i8lWv0Rb-m2EK9t2nvyC2rik",
    authDomain: "this-is-a-test-bb2be.firebaseapp.com",
    databaseURL: "https://this-is-a-test-bb2be.firebaseio.com",
    projectId: "this-is-a-test-bb2be",
    storageBucket: "this-is-a-test-bb2be.appspot.com",
    messagingSenderId: "890505952792"
};
firebase.initializeApp(config);

//Reference to database
var database = firebase.database();

// Our on-click function to take text submitted and push to...
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // These variables will grab the user's input from the HTML
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#frist-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // firstTrain = String(firstTrain);
    console.log(firstTrain);

    // Make a temporary object array to hold this new input information
    var newTrain = {
        name: trainName,
        trainDestination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    //Will upload the info to the database 
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.trainDestination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("Train successfully added");

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var snap = childSnapshot.val();
  
    var trainName = snap.name;
    var destination = snap.trainDestination;
    var frequency = snap.frequency;
    var firstTrain = snap.firstTrain;

    var timeArray = firstTrain.split(":");
    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    console.log(trainTime);
    trainTime = moment(trainTime).format('x');
    var now = moment().format('x');
    console.log(trainTime);
    console.log(now);
    while(trainTime < now) {
        trainTime = moment(trainTime, 'x')
            .add(frequency, 'm')
            .format('x');
        console.log(trainTime);
    };

    // var minutesAway = moment().diff(moment(trainTime), "minutes");

    // var minutesAway = moment(now, 'x')
    //     .subtract(trainTime, 'x')
    //     .format('x');

    // var minutesAway = moment(moment(trainTime,"MMMM Do YYYY, h:mm:ss a")
    //                 .to(moment(now,"MMMM Do YYYY, h:mm:ss a"))).format("hh:mm")
    // minutesAway = moment(minutesAway, 'MMMM Do YYYY, h:mm:ss a').format('mm');

    // var minutesAway = moment().diff(trainTime, "minutes");
    // minutesAway = moment.duration(minutesAway).asMinutes()

    trainTime = moment(trainTime, 'x').format('h:mm a');
    console.log(trainTime);
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(firstTrain);
    console.log(minutesAway);
    
    $(`
      <tr>
      <td> ${trainName}</td>
      <td> ${destination}</td>
      <td> ${frequency}</td>
      <td> ${trainTime}</td>
      </tr>
    `).appendTo('#train-table');
    
  })