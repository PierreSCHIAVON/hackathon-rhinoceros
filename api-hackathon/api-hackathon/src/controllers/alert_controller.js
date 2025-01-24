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
exports.alertController = void 0;
const alert_service_1 = require("../services/alert_service");
exports.alertController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alert = yield alert_service_1.alertService.createAlert(req.body);
                res.status(201).json(alert);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la création de l’alerte.' });
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alerts = yield alert_service_1.alertService.getAllAlerts();
                res.status(200).json(alerts);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la récupération des alertes.' });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alert = yield alert_service_1.alertService.getAlertById(parseInt(req.params.id));
                if (alert) {
                    res.status(200).json(alert);
                }
                else {
                    res.status(404).json({ error: 'Alerte non trouvée.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la récupération de l’alerte.' });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedAlert = yield alert_service_1.alertService.updateAlert(parseInt(req.params.id), req.body);
                if (updatedAlert) {
                    res.status(200).json(updatedAlert);
                }
                else {
                    res.status(404).json({ error: 'Alerte non trouvée.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la mise à jour de l’alerte.' });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield alert_service_1.alertService.deleteAlert(parseInt(req.params.id));
                if (isDeleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ error: 'Alerte non trouvée.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la suppression de l’alerte.' });
            }
        });
    },
};
