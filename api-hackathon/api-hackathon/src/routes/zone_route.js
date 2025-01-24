"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zone_controller_1 = require("../controllers/zone_controller");
const router = (0, express_1.Router)();
router.post('/', zone_controller_1.zoneController.create);
router.get('/', zone_controller_1.zoneController.getAll);
router.get('/:id', zone_controller_1.zoneController.getById);
router.put('/:id', zone_controller_1.zoneController.update);
router.delete('/:id', zone_controller_1.zoneController.delete);
exports.default = router;
