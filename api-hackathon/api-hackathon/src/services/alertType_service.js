"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertTypeService = void 0;
const alertType_model_1 = require("../models/alertType_model");
exports.alertTypeService = {
    createAlertType(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield alertType_model_1.AlertType.create(data);
        });
    },
    getAllAlertTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield alertType_model_1.AlertType.findAll();
        });
    },
    getAlertTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield alertType_model_1.AlertType.findByPk(id);
        });
    },
    updateAlertType(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const alertType = yield alertType_model_1.AlertType.findByPk(id);
            if (alertType) {
                return yield alertType.update(updates);
            }
            return null;
        });
    },
    deleteAlertType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const alertType = yield alertType_model_1.AlertType.findByPk(id);
            if (alertType) {
                yield alertType.destroy();
                return true;
            }
            return false;
        });
    },
};
