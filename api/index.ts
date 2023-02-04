import app from "./src/app";
const port = process.env.PORT || 3700;
import db from "./src/models";

// Syncing all the models at once.
db.sequelize.sync({force:true}).then(()=> {
    app.listen(port, ()=>{
        console.log(`App listening on port ${port}`)
    })
})

