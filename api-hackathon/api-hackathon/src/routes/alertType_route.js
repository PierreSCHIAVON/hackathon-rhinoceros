"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alertType_controller_1 = require("../controllers/alertType_controller");
const router = (0, express_1.Router)();
router.post('/', alertType_controller_1.alertTypeController.create);
router.get('/', alertType_controller_1.alertTypeController.getAll);
router.get('/:id', alertType_controller_1.alertTypeController.getById);
router.put('/:id', alertType_controller_1.alertTypeController.update);
router.delete('/:id', alertType_controller_1.alertTypeController.delete);
exports.default = router;
