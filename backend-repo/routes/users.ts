import { Router } from "express";
import { userControllers } from "../controllers/users";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.post("/login", userControllers.login);
router.use(authentication);
router.get("/fetch-user-data", userControllers.fetchAllUsers);
router.put("/update-user-data/:id", userControllers.updateUser);

export { router as usersRouter };
