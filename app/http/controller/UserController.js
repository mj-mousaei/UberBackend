const _ = require("lodash");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const UserModel = require("../../models/UserModel");
const {loginValidator,registerValidator} = require("../validator/UserValidator");
const { token } = require("morgan");



module.exports = new class UserController {
    
   
    async registerUser(req,res){
        const {error} = registerValidator(req.body);
    if (error) return res.status(400).send({message : error.message});

    let user = await UserModel.findOne({email: req.body.email});
    if (user)
             return res
             .status(400)
             .send({message : "user exist"});

        user = new UserModel(_.pick(req.body, ['email','name','password']));
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, salt);
        user.password = pass;

        user = await user.save();
        const data ={
            _id : user._id,
            email : user.email,
            name : user.name,
        };
        const token = jwt.sign(data, config.get("jwtPrivateKey"), {
            expiresIn : 60 * 60 * 24
            });
        res.send({..._.pick(user, ['email','name','_id']), token});
    }

    async loginUser(req,res){
        const {error} = loginValidator(req.body);
    if (error) return res.status(400).send({message : error.message});

    let user = await UserModel.findOne({email: req.body.email});
    if (!user) return res.status(400).send({message : "user or password is wrong"});

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send({message : "user or password is wrong"});

    const data ={
        _id : user._id,
        email : user.email,
        name : user.name,
    };
    const token = jwt.sign(data,  config.get("jwtPrivateKey"), {
    expiresIn : 60 * 60 * 24
    });
    res.status(200).send({"x-auth-token" :token}); 
    }


    async editUser(req,res){

        let userId = await UserModel.findById({_id: req.params.id });
        if (!userId)
                 return res
                 .status(400)
                 .send({message : "user not exist"});
                 const result = await UserModel.findByIdAndUpdate(userId, {
                  $set: _.pick(req.body, [
                    'name',
                    'surename',
                    'phone',
                    'country',
                    'state',
                    'address',
                    'postalcode',
                    'userType',
                    'description',
                    'lat',
                    'lng',
                    'verified',
                    'status'
                  ]),
                },{new : true});
                if (!result) return  res.status(404).json({ errors }).send('not found');
                res.status(200).json(
                  _.pick(result, [
                    'name',
                    'surename',
                    'phone',
                    'country',
                    'state',
                    'address',
                    'postalcode',
                    'userType',
                    'description',
                    'lat',
                    'lng',
                    'verified',
                    'status'
                  ]),
                );
    }

    
    async postMe(req,res){
    
        const userdata = req.query.tokencheck;


        var decode = jwt.verify(userdata, config.get("jwtPrivateKey"));
        const expDate = new Date(decode.exp * 1000)
        if (Date.now() <= expDate )     
        res.status(200).json({decode})
        else
        res.status(200).json(false)
        }

        
};