const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect("mongodb+srv://adityasharma:aditya123@aditya.3rpqp.mongodb.net/fortune").then(
        ()=> console.log("MongoDB Connected SuccessfullY")
    ).catch(
        (err)=> console.log(err)
    )
}

module.exports = connectDB