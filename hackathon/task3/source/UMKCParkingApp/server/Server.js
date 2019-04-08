var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
//maybe: mongodb://umkcParkTest:umkcParkTest@umkcparking.mybluemix.net:27017/parkingAvailability  ?
//var url = 'mongodb://umkcParkTest:umkcParkTest@umkcparking.mybluemix.net:27017/UMKCParking';
var url = 'mongodb://umkcParkTest:umkcParkTest1@ds237735.mlab.com:37735/umkc-parking';
var app = express();

var db;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});


//Initialize the db
// db.createCollection("<collectionName>", { autoIndexId: false })
MongoClient.connect(url, function(err, database) {
  if(err) {
    return console.error(err);
  }else{
    console.log("Connected to db!");
    db = database;

    var cursor = db.collection('availabilityUpdate').find();
    cursor.forEach(function(data){
      //Per lotID
      if(data.payload._id == 1){
        //update the availability of that lot
        console.log(data);
      }
    });

    //Used to initialize 'parkingAvailaibily' ccollection
    db.createCollection('parkingAvailability', { autoIndexId: false });
    initAvail.forEach(function(avail){
      console.log(avail);
      db.collection('parkingAvailability').insertOne(avail);
      console.log("Successfully Inserted");
    });
    //db.collection('parkingAvailability').insertMany(initAvail);
    //Used to initialize 'parkingAvailaibily' ccollection
    db.createCollection('parkingLots', { autoIndexId: false });
    db.collection('parkingLots').insertMany(initLots);

    //Bring the db up-to-date
  }
});

var createCol = function(db, data, callback) {
  //db.createCollection('parkingAvailability');
  //console.log(db.collection('parkingAvailability').stats())
  db.collection('parkingAvailability').insertOne(data, function(err, result) {
    //db.collection('parkingAvailability').insertOne( data, function(err, result) {
    if(err)
    {
      res.write("Insert Failed, Error while inserting document");
      res.end();
    }
    console.log("Inserted document into the 'parkingAvailability' collection.");
    callback();
  });
};

var initAvail = [
  {
    "_id":            1,
    "availableSpots": 100
  },
  {
    "_id":            2,
    "availableSpots": 50
  },
  {
    "_id":            3,
    "availableSpots": 40
  },
  {
    "_id":            4,
    "availableSpots": 30
  },
  {
    "_id":            5,
    "availableSpots": 20
  }
];

var initLots = [
  {
    "_id":         1,
    "name":       "Rockhill Parking Structure",
    "address":    "5277 Charlotte St, Kansas City, MO 64110, USA",
    "location" : {
      "lat": 39.03205,
      "lng": -94.5765
    },
    "capacity":  900,
    "group":      1,
    "type":       "student"
  },
  {
    "_id":         2,
    "name":       "UMKC Parking Lot 4",
    "address":    "4921 Rockhill Rd, Kansas City, MO 64110",
    "location" : {
      "lat": 39.0363009,
      "lng": -94.576883
    },
    "capacity":  330,
    "group":      2,
    "type":       "student"
  },
  {
    "_id":         3,
    "name":       "UMKC School of Medicine Lot",
    "address":    "2411 Holmes St., Kansas City, MO 64110",
    "location" : {
      "lat": 39.034124,
      "lng": -94.572823
    },
    "capacity":  200,
    "group":      4,
    "type":       "faculty"
  },
  {
    "_id":         4,
    "name":       "Cherry street parking garage",
    "address":    "E 50th St., Kansas City, MO 64110",
    "location" : {
      "lat": 39.027829,
      "lng": -94.579448


    },
    "capacity":  150,
    "group":      4,
    "type":       "student"
  },
  {
    "_id":         5,
    "name":       "51st Street and Troost Ave",
    "address":    "51st Street and Troost Ave, Kansas City, MO 64110",
    "location" : {
      "lat": 39.743943,
      "lng": -105.020089
  },
  "capacity":  100,
  "group":      5,
  "type":       "student"
}
];

var varIntervalBetweenData = 2;
var availability = [];
var lots = [];

setInterval(function(){
  availability = [];
  lots = [];
  var cursor1 = db.collection('parkingAvailability').find();
  cursor1.forEach(function(data) {
    console.log(data);
    availability.push(data);
  });

  var cursor2 = db.collection('parkingLots').find();
  cursor2.forEach(function(data) {
    console.log(data);
    lots.push(data);
  });
}, varIntervalBetweenData*1000);

//Want to post to mongodb provided by node-red
app.get('/reportAvailability', function(req, res) {

    console.log("posts!");

});

app.get('/getAvailability', function(req, res){

  res.send(availability);
});

app.get('/getLots', function(req, res){
  res.send(lots);
});


app.post('/submitAvailability', function(req,res){
  console.log(req.body);
  console.log(req.body._id);
  console.log(req.body.avail);
  db.collection('parkingAvailability').deleteOne({_id: req.body._id}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete!");
    } else {
      //res.status(204).end();
    }
  });

  var avail = {
    "_id":            req.body._id,
    "availableSpots": parseInt(req.body.avail)
  };

  console.log(avail);

  db.collection('parkingAvailability').insertOne(avail);
  console.log(res)
  res.send('POST request successful')
});

// app.post('/reserveSpot', function(req,res){
//   console.log(req.body);
//   console.log(req.body._id);
//   // console.log(req.body.avail);
//   db.collection('parkingAvailability').deleteOne({_id: req.body._id}, function(err, result) {
//     if (err) {
//       handleError(res, err.message, "Failed to delete!");
//     } else {
//       //res.status(204).end();
//     }
//   });
//
//   var avail = {
//     "_id":            req.body._id,
//     "availableSpots": parseInt(avail.find())
//   };
//
//   console.log(avail);
//
//   db.collection('parkingAvailability').insertOne(avail);
//   console.log(res)
//   res.send('POST request successful')
// });

var server = app.listen(8081,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});
