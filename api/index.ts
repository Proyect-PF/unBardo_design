import express from "express";
const app = express();
const port = process.env.PORT || 3010;
const db = require("./src/models/index.js")

// Syncing all the models at once.
db.sequelize.sync({force:false}).then(()=> {
    app.listen(port, ()=>{
        console.log(`App listening on port ${port}`)
    })
})

