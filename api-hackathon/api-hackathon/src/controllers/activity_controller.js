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
exports.activityController = void 0;
const activity_service_1 = require("../services/activity_service");
exports.activityController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activity = yield activity_service_1.activityService.createActivity(req.body);
                res.status(201).json(activity);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la création de l’activité.' });
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activities = yield activity_service_1.activityService.getAllActivities();
                res.status(200).json(activities);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la récupération des activités.' });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activity = yield activity_service_1.activityService.getActivityById(parseInt(req.params.id));
                if (activity) {
                    res.status(200).json(activity);
                }
                else {
                    res.status(404).json({ error: 'Activité non trouvée.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la récupération de l’activité.' });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedActivity = yield activity_service_1.activityService.updateActivity(parseInt(req.params.id), req.body);
                if (updatedActivity) {
                    res.status(200).json(updatedActivity);
                }
                else {
                    res.status(404).json({ error: 'Activité non trouvée.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la mise à jour de l’activité.' });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield activity_service_1.activityService.deleteActivity(parseInt(req.params.id));
                if (isDeleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ error: 'Activité non trouvée.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la suppression de l’activité.' });
            }
        });
    },
};
