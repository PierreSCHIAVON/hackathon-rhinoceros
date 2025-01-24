"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertNamespace = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const http_1 = require("http");
const path_1 = require("path");
const socket_io_1 = require("socket.io");
const activity_route_1 = __importDefault(require("./routes/activity_route"));
const alert_route_1 = __importDefault(require("./routes/alert_route"));
const alertType_route_1 = __importDefault(require("./routes/alertType_route"));
const message_route_1 = __importDefault(require("./routes/message_route"));
const notify_route_1 = __importDefault(require("./routes/notify_route"));
const zone_route_1 = __importDefault(require("./routes/zone_route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/zones', zone_route_1.default);
app.use('/api/notify', notify_route_1.default);
app.use('/api/alerts', alert_route_1.default);
app.use('/api/alert-types', alertType_route_1.default);
app.use('/api/messages', message_route_1.default);
app.use('/api/activities', activity_route_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur interne est survenue.' });
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    },
    pingTimeout: 60000,
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
io.on('connection', (socket) => {
    const chatHistory = loadChatHistory();
    socket.emit('chat history', chatHistory);
    socket.on('chat', (data) => {
        const message = Object.assign(Object.assign({}, data), { timestamp: new Date() });
        const history = loadChatHistory();
        history.push(message);
        saveChatHistory(history);
        io.emit('chat', `${data.username}: ${data.message}`);
    });
});
exports.alertNamespace = io.of('/alertSocket');
exports.alertNamespace.on('connection', (socket) => {
    console.log('Client connected to /alertSocket namespace');
    socket.on('disconnect', () => {
        console.log('Client disconnected from /alertSocket namespace');
    });
});
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
