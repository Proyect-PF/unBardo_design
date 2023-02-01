import express from "express";
const app = express();
const port = process.env.PORT || 3010;
import db from "./src/models";

// Syncing all the models at once.
db.sequelize.sync({alter:false}).then(()=> {
    app.listen(port, ()=>{
        console.log(`App listening on port ${port}`)
    })
})

