import { Router } from "express";
import { userControllers } from "../controllers/users";

const router = Router();

router.post("/login", userControllers.login);
router.get("/fetch-user-data", userControllers.fetchAllUsers);

export { router as usersRouter };
