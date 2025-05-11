import { Router } from "express";
import { userControllers } from "../controllers/users";

const router = Router();

router.post("/login", userControllers.login);

export { router as usersRouter };
