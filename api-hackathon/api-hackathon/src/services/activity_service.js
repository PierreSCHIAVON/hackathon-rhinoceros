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
exports.activityService = void 0;
const activity_model_1 = require("../models/activity_model");
exports.activityService = {
    createActivity(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield activity_model_1.Activity.create(data);
        });
    },
    getAllActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield activity_model_1.Activity.findAll();
        });
    },
    getActivityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield activity_model_1.Activity.findByPk(id);
        });
    },
    updateActivity(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = yield activity_model_1.Activity.findByPk(id);
            if (activity) {
                return yield activity.update(updates);
            }
            return null;
        });
    },
    deleteActivity(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = yield activity_model_1.Activity.findByPk(id);
            if (activity) {
                yield activity.destroy();
                return true;
            }
            return false;
        });
    },
};
