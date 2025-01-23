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
exports.messageService = void 0;
const message_model_1 = require("../models/message_model");
exports.messageService = {
    createMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_model_1.Message.create(data);
        });
    },
    getAllMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_model_1.Message.findAll();
        });
    },
    getMessageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_model_1.Message.findByPk(id);
        });
    },
    updateMessage(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_model_1.Message.findByPk(id);
            if (message) {
                return yield message.update(updates);
            }
            return null;
        });
    },
    deleteMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_model_1.Message.findByPk(id);
            if (message) {
                yield message.destroy();
                return true;
            }
            return false;
        });
    },
};
