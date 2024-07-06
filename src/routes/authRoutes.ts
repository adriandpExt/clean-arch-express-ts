import express from "express";

import { AuthRepository } from "../repositories/AuthRepository";
import { AuthInterators } from "../interactors/AuthInteractors";
import { AuthController } from "../contoller/authController";

const repository = AuthRepository;
const interactor = AuthInterators(repository);

const controller = AuthController(interactor);

const router = express.Router();

router.post("/login", controller.onLogin);
router.post("/register", controller.onRegister);

export default router;
