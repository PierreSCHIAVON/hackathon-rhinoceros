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
exports.zoneController = void 0;
const zone_service_1 = require("../services/zone_service");
exports.zoneController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const zone = yield zone_service_1.zoneService.createZone(req.body);
                res.status(201).json(zone);
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la création de la zone.' });
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const zones = yield zone_service_1.zoneService.getAllZones();
                res.status(200).json(zones);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la récupération des zones.' });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const zone = yield zone_service_1.zoneService.getZoneById(parseInt(req.params.id));
                if (zone) {
                    res.status(200).json(zone);
                }
                else {
                    res.status(404).json({ error: 'Zone non trouvée.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la récupération de la zone.' });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedZone = yield zone_service_1.zoneService.updateZone(parseInt(req.params.id), req.body);
                if (updatedZone) {
                    res.status(200).json(updatedZone);
                }
                else {
                    res.status(404).json({ error: 'Zone non trouvée.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la mise à jour de la zone.' });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield zone_service_1.zoneService.deleteZone(parseInt(req.params.id));
                if (isDeleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ error: 'Zone non trouvée.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la suppression de la zone.' });
            }
        });
    },
};
