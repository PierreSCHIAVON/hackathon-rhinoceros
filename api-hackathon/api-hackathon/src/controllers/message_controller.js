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
exports.messageController = void 0;
const message_service_1 = require("../services/message_service");
exports.messageController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield message_service_1.messageService.createMessage(req.body);
                res.status(201).json(message);
            }
            catch (error) {
                res.status(500).json({ error: 'Erreur lors de la création du message.' });
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield message_service_1.messageService.getAllMessages();
                res.status(200).json(messages);
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la récupération des messages.' });
            }
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield message_service_1.messageService.getMessageById(parseInt(req.params.id));
                if (message) {
                    res.status(200).json(message);
                }
                else {
                    res.status(404).json({ error: 'Message non trouvé.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la récupération du message.' });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedMessage = yield message_service_1.messageService.updateMessage(parseInt(req.params.id), req.body);
                if (updatedMessage) {
                    res.status(200).json(updatedMessage);
                }
                else {
                    res.status(404).json({ error: 'Message non trouvé.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la mise à jour du message.' });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield message_service_1.messageService.deleteMessage(parseInt(req.params.id));
                if (isDeleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ error: 'Message non trouvé.' });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: 'Erreur lors de la suppression du message.' });
            }
        });
    },
};
