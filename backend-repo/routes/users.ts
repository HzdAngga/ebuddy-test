import { Router } from "express";
import { userControllers } from "../controllers/users";
import { authentication } from "../middlewares/authentication";

const router = Router();

router.post("/login", userControllers.login);
router.get("/seed", userControllers.seed);
router.use(authentication);
router.get("/fetch-user-data", userControllers.fetchAllUsers);
router.put("/update-user-data", userControllers.updateUser);

export { router as usersRouter };
