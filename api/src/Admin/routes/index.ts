import { Router } from 'express';
import postAdmin from '../controllers/postAdmin';
import getAdmins from '../controllers/getAdmins';
const adminRoutes = Router();


//postUser
// adminRoutes.delete('/', );

// adminRoutes.put("/", )

adminRoutes.get("/", getAdmins)

adminRoutes.post("/", postAdmin)






export default adminRoutes;