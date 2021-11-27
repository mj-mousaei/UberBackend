const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const loginValidator = (data)=>{
    const schema = Joi.object({
          email : Joi.string().required(),
          password : Joi.string().required()
      });
      return schema.validate(data);

    } 

const registerValidator = (data)=>{
  const schema = Joi.object({
    email : Joi.string().required(),
    password : Joi.string().required(),
    name : Joi.string().required()
    });
    return schema.validate(data);

  } 

      module.exports = {loginValidator,registerValidator};