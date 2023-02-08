import app from "./src/app";
import db from "./src/database";
import { POST_rolesInitials } from "./src/helpers/initialSetup";
const port = process.env.PORT || 3700;

// Syncing all the models at once.
db.sequelize.sync({alter:true}).then(()=> {
    app.listen(port, ()=>{
        console.log(`APP SERVER ESCUCHANDO EN EL PUERTO ${port}`)
    })
})
//Iniciamos roles por defecto
.then(()=> {
    POST_rolesInitials()
})

