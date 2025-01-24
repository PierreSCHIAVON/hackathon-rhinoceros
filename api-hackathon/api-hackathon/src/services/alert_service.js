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
exports.alertService = void 0;
const alert_model_1 = require("../models/alert_model");
exports.alertService = {
    createAlert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield alert_model_1.Alert.create(data);
        });
    },
    getAllAlerts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield alert_model_1.Alert.findAll();
        });
    },
    getAlertById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield alert_model_1.Alert.findByPk(id);
        });
    },
    updateAlert(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield alert_model_1.Alert.findByPk(id);
            if (alert) {
                return yield alert.update(updates);
            }
            return null;
        });
    },
    deleteAlert(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield alert_model_1.Alert.findByPk(id);
            if (alert) {
                yield alert.destroy();
                return true;
            }
            return false;
        });
    },
};
