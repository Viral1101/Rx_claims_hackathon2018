/**
 * Created by karthik on 7/14/17.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url='mongodb://localhost/medicaid';//1.Modify this url with the credentials of your db name and password.
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var totalByState = [{$group:{_id:"$State",total:{$sum:"$Total Amount Reimbursed"}}}];
//var query = '{"$group":{"_id":"$State","total":{"$sum":"$Total Amount Reimbursed"}}}';
var scriptsByUS = [   { $match: { "State": {"$ne":"XX"}} },   { $group: { _id: "$Medication_List", total_pres: { $sum: "$number_of_prescriptions" } } },   { $sort: { total_pres: -1 } } ];


app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        //dav.find(req.query)

      //var query = req.query;
        //console.log(query);

        db.collection('prescriptions').aggregate(totalByState).toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {
              console.log(res);
              res.send(result);

            }
            console.log("Got All Documents");

        });
    });

});

app.get('/list', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err)
    {
      res.write("Failed, Error while connecting to Database");
      res.end();
    }

    //dav.find(req.query)

    var query = req.query;
    console.log(query);

    db.collection('ndcMed').aggregate().toArray(function(err, result){
      if(err)
      {
        res.write("get Failed");
        res.end();
      }else
      {
        console.log(res);
        res.send(result);

      }
      console.log("Got All Documents");

    });
  });

});

app.get('/prescrip', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err)
    {
      res.write("Failed, Error while connecting to Database");
      res.end();
    }

    var query = {};
    console.log("HERE");
    //console.log(req.query);
    if(Object.keys(req.query).length !== 0){
      console.log(req.query);
      query = [   { $match: { "State": {"$eq":req.query.usState}} },   { $group: { _id: "$Medication_List", total_pres: { $sum: "$number_of_prescriptions" } } },   { $sort: { total_pres: -1 } } ];

      console.log(query[0].$match.State);
    }else{
      query = scriptsByUS;
    }



    db.collection('ndcpres').aggregate(query).toArray(function(err, result){
      if(err)
      {
        res.write("get Failed");
        res.end();
      }else
      {
        //console.log(res);
        res.send(result);

      }
      console.log("Got All Documents");

    });
  });

});

app.get('/prescripTog', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if(err)
    {
      res.write("Failed, Error while connecting to Database");
      res.end();
    }

    var query = {};
    console.log("HERE");
    //console.log(req.query);
    if(Object.keys(req.query).length !== 0){
      console.log(req.query);
      query = [   { $match: { "State": {"$eq":req.query.usState}},"total_amount_reimbursed":{"$gt":0}},   { $group: { _id: "$Medication_List", total_pres: { $sum: "$total_amount_reimbursed" } } },   { $sort: { total_pres: -1 } } ];

      console.log(query[0].$match.State);
    }else{
      query = scriptsByUS;
    }



    db.collection('ndcpres').aggregate(query).toArray(function(err, result){
      if(err)
      {
        res.write("get Failed");
        res.end();
      }else
      {
        //console.log(res);
        res.send(result);

      }
      console.log("Got All Documents");

    });
  });

});


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});
