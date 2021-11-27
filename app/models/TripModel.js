const mongoose = require("mongoose");



const TripSchema = new mongoose.Schema(
    {
        passengerId : { type : mongoose.Schema.Types.ObjectId , ref : 'UserModel'},
        driverId : { type : mongoose.Schema.Types.ObjectId , ref : 'UserModel'},
        latStart : Number,
        lngStart : Number,
        latEnd : Number,
        lngEnd : Number,
        price : Number,
        distance : Number,
        timeEstimate : Number,
        rate : Number,
        comment : String,
        status : String,
        description : String,
    },{ timestamps : true }, 
); 

const TripModel = mongoose.model('trip', TripSchema);


module.exports = TripModel;
