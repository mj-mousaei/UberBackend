const mongoose = require("mongoose");
const UserModel = require("../../models/UserModel");
const TripModel = require("../../models/TripModel");
const _ = require("lodash");


//hello 22



module.exports = new class TripController {


    async getTripById(req,res){
        const trip =await TripModel.findById(req.params.id);
        if (trip)
        res.send(trip);
        else res.status(404).send("not found");
    }
    

    async getPassengerTrips(req,res){
        let user = await UserModel.findById(req.params.id).populate('passengerTrips').exec();
        if (user)
        res.json(user);
        else res.status(404).send("not found");
      }

    async getDriverTrips(req,res){
        let driver = await UserModel.findById(req.params.id).populate('driverTrips').exec();
        if (driver)
        res.json(driver);
        else res.status(404).send("not found");
      }


    async newTrip(req,res){
        let trip = new TripModel({
            passengerId : req.body.passengerId,
            driverId : req.body.driverId,
            latStart : req.body.latStart,
            lngStart : req.body.lngStart,
            latEnd : req.body.latEnd,
            lngEnd : req.body.lngEnd,
            price : req.body.price,
            distance : req.body.distance,
            timeEstimate : req.body.timeEstimate,
            status : req.body.status,
            description : req.body.description,
        });
        trip = await trip.save();
        res.send(trip);        
    }


    async editTrip(req,res){

        let trip = await TripModel.findById({_id: req.params.id });
        if (!trip)
                 return res
                 .status(400)
                 .send({message : "trip not exist"});
                 const result = await TripModel.findByIdAndUpdate(trip, {
                  $set: _.pick(req.body, [
                    'latStart',
                    'lngStart',
                    'latEnd',
                    'lngEnd',
                    'price',
                    'distance',
                    'timeEstimate',
                    'status',
                    'description',
                    'rate',
                    'comment'
                  ]),
                },{new : true});
                if (!result) return  res.status(404).json({ errors }).send('not found');
                res.status(200).json(
                  _.pick(result, [
                    'latStart',
                    'lngStart',
                    'latEnd',
                    'lngEnd',
                    'price',
                    'distance',
                    'timeEstimate',
                    'status',
                    'description',
                    'rate',
                    'comment'
                  ]),
                );
    }


};
