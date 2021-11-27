const mongoose = require("mongoose");



  const UserSchema = new mongoose.Schema(
    {
      email : {type: String , required : true} ,
      password :  {type: String ,  required : true} ,
      name : String ,
      surename : String,
      phone : String ,
      country : String ,
      state : String ,
      address : String,
      postalcode : String,
      img : String ,
      userType : {type : String, enum : ['passenger','driver']},
      description : String,
      lat: Number,
      lng: Number,
      verified: Boolean,
      status : {type : String, enum : ['live','off']},
      rateAverage : Number,
    }, { timestamps : true , toJSON : { virtuals : true } }
); 

UserSchema.virtual('passengerTrips' , {
  ref : 'trip',
  localField : '_id',
  foreignField : 'passengerId'
})

UserSchema.virtual('driverTrips' , {
  ref : 'trip',
  localField : '_id',
  foreignField : 'driverId'
})




const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;