
import { Router } from "express";
import { roleController } from "../controllers/role.controller";; 

const router = Router();

// Route zum Erstellen einer neuen Rolle
router.post("/roles", roleController.createRole);

// Route zum Abrufen aller Rollen
router.get("/roles", roleController.getAllRoles);

// Route zum Aktualisieren einer Rolle
router.put("/roles/:id", roleController.updateRole);

// Route zum Löschen einer Rolle
router.delete("/roles/:id", roleController.deleteRole);

export default router;
