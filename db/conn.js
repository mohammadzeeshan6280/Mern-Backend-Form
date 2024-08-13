const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/register", {

}).then(() => {
    console.log(`Connection successful..`)
}).catch((err) => {
    console.log(`Connection failed...`)
})