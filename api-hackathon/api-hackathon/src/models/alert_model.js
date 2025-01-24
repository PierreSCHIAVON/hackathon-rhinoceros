"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const zone_model_1 = require("./zone_model");
const alertType_model_1 = require("./alertType_model");
class Alert extends sequelize_1.Model {
}
exports.Alert = Alert;
Alert.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dateTimeStart: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dateTimeEnd: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    intensity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 10,
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'Alert',
    tableName: 'alerts',
    timestamps: false,
});
Alert.belongsTo(zone_model_1.Zone, { foreignKey: 'zoneId' });
zone_model_1.Zone.hasMany(Alert, { foreignKey: 'zoneId' });
Alert.belongsTo(alertType_model_1.AlertType, { foreignKey: 'alertTypeId' });
alertType_model_1.AlertType.hasMany(Alert, { foreignKey: 'alertTypeId' });
