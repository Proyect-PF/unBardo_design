import { Router } from 'express';
import postAdmin from '../controllers/postAdmin';
import getAdmins from '../controllers/getAdmins';
const adminRoutes = Router();


//postUser
// adminRoutes.delete('/', );

// adminRoutes.put("/", )

adminRoutes.get("/", getAdmins)

adminRoutes.get("/", postAdmin)






export default adminRoutes;