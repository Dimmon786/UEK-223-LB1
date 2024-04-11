import { Router } from "express";
import { usersController, authController } from "../controllers/users.controller";

const router = Router();

// Authentifizierungsrouten
router.post("/login", authController.loginUser);

// Benutzerverwaltungsrouten
router.post("/users", usersController.createUser); // Neuen Benutzer erstellen
router.get("/users", usersController.getAllUsersWithRoles); // Alle Benutzer mit Rollen abrufen
router.put("/users/:id", usersController.updateUser); // Benutzerdaten aktualisieren
router.delete("/users/:id", usersController.deleteUser); // Benutzer löschen

export default router;
