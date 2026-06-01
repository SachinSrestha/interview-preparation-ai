require("dotenv").config()

const app = require("./src/app")
const connectDB = require("./src/config/db")

connectDB()

port= process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})