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
exports.zoneService = void 0;
const zone_model_1 = require("../models/zone_model");
exports.zoneService = {
    createZone(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield zone_model_1.Zone.create(data);
        });
    },
    getAllZones() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield zone_model_1.Zone.findAll();
        });
    },
    getZoneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield zone_model_1.Zone.findByPk(id);
        });
    },
    updateZone(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const zone = yield zone_model_1.Zone.findByPk(id);
            if (zone) {
                return yield zone.update(updates);
            }
            return null;
        });
    },
    deleteZone(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const zone = yield zone_model_1.Zone.findByPk(id);
            if (zone) {
                yield zone.destroy();
                return true;
            }
            return false;
        });
    },
};
