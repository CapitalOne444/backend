
const express = require("express")

//Application / Server Crate
const app = express()

//To connect Database
const connectDB = require('./db')
connectDB()

//Cross origin securtiy
const cors = require("cors")
app.use(cors())

app.use(express.json())

const Data = require('./data.json')


//API Run
app.use("/api", require('./routes/userRoute'))
app.use("/api", require('./routes/transactionRoute'))
app.use("/api", require('./routes/withdrawalRoute'))
app.use('/api', require('./routes/email'))
app.use('/api', require('./routes/trade'))
//Server Start/Run
app.listen(5000, ()=>{
    console.log(`Server running at localhost:5000`)
})