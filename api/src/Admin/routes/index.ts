import { Router } from 'express';
import postAdmin from '../controllers/postAdmin';

const adminRoutes = Router();


//postUser
// adminRoutes.delete('/', );

// adminRoutes.put("/", )

// adminRoutes.get("/", )

adminRoutes.post("/", postAdmin)






export default adminRoutes;