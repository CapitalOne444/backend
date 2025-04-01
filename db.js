const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect("mongodb+srv://sorhub:sorhub07@cluster0.hrtyd.mongodb.net/capitalone").then(
        ()=> console.log("MongoDB Connected SuccessfullY")
    ).catch(
        (err)=> console.log(err)
    )
}

module.exports = connectDB
