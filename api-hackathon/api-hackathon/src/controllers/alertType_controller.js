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
exports.alertTypeController = void 0;
const alertType_service_1 = require("../services/alertType_service");
exports.alertTypeController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alertType = yield alertType_service_1.alertTypeService.createAlertType(req.body);
                res.status(201).json(alertType);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la création du type d’alerte.' });
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alertTypes = yield alertType_service_1.alertTypeService.getAllAlertTypes();
                res.status(200).json(alertTypes);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la récupération des types d’alerte.' });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alertType = yield alertType_service_1.alertTypeService.getAlertTypeById(parseInt(req.params.id));
                if (alertType) {
                    res.status(200).json(alertType);
                }
                else {
                    res.status(404).json({ error: 'Type d’alerte non trouvé.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la récupération du type d’alerte.' });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedAlertType = yield alertType_service_1.alertTypeService.updateAlertType(parseInt(req.params.id), req.body);
                if (updatedAlertType) {
                    res.status(200).json(updatedAlertType);
                }
                else {
                    res.status(404).json({ error: 'Type d’alerte non trouvé.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la mise à jour du type d’alerte.' });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield alertType_service_1.alertTypeService.deleteAlertType(parseInt(req.params.id));
                if (isDeleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ error: 'Type d’alerte non trouvé.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la suppression du type d’alerte.' });
            }
        });
    },
};
