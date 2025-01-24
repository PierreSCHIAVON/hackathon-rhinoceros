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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatNamespace = exports.alertNamespace = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const zone_route_1 = __importDefault(require("./routes/zone_route"));
const alert_route_1 = __importDefault(require("./routes/alert_route"));
const alertType_route_1 = __importDefault(require("./routes/alertType_route"));
const message_route_1 = __importDefault(require("./routes/message_route"));
const activity_route_1 = __importDefault(require("./routes/activity_route"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});
const CHAT_HISTORY_FILE = (0, path_1.join)(__dirname, 'chat_history.json');
const loadChatHistory = () => {
    try {
        return JSON.parse(fs_1.default.readFileSync(CHAT_HISTORY_FILE, 'utf8'));
    }
    catch (_a) {
        return [];
    }
};
const saveChatHistory = (messages) => {
    fs_1.default.writeFileSync(CHAT_HISTORY_FILE, JSON.stringify(messages));
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/zones', zone_route_1.default);
app.use('/api/alerts', alert_route_1.default);
app.use('/api/alert-types', alertType_route_1.default);
app.use('/api/messages', message_route_1.default);
app.use('/api/activities', activity_route_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur interne est survenue.' });
});
exports.alertNamespace = io.of('/alertSocket');
exports.alertNamespace.on('connection', (socket) => {
    console.log('Client connected to /alertSocket namespace');
    socket.on('disconnect', () => {
        console.log('Client disconnected from /alertSocket namespace');
    });
});
exports.chatNamespace = io.of('/chat');
exports.chatNamespace.on('connection', (socket) => {
    console.log('User connected to /chat namespace');
    const chatHistory = loadChatHistory();
    socket.emit('chat history', chatHistory);
    socket.on('chat', (data) => {
        const message = Object.assign(Object.assign({}, data), { timestamp: new Date() });
        const history = loadChatHistory();
        history.push(message);
        saveChatHistory(history);
        exports.chatNamespace.emit('chat', `${data.username}: ${data.message}`);
    });
    socket.on('chat', (data) => {
        console.log(`Chat message from ${data.username}: ${data.message}`);
        exports.chatNamespace.emit('chat', `${data.username}: ${data.message}`);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected from /chat namespace');
    });
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.syncDatabase)();
        const PORT = parseInt(process.env.PORT || '3000', 10);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    }
    catch (error) {
        console.error('Erreur lors du démarrage du serveur :', error);
    }
});
startServer();
