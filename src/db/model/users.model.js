import mongoose, { Schema } from "mongoose";
 let usersSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [30, "Name must be less than 30 characters long"],
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        isEmail: true,
        message:" email elerady exists",
    },
    password:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },age:{
        type: Number,
        required:true,
        min: [18, "Age must be at least 18"],
        max: [60, "Age must be less than or equal 60"],
    }
},{
  timestamps: true,

})




export const usersModel = mongoose.model("users", usersSchema);