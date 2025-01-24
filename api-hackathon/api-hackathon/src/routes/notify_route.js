"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notify_controller_1 = require("../controllers/notify_controller");
const router = (0, express_1.Router)();
router.post('/', notify_controller_1.notifyController.getAll);
exports.default = router;
