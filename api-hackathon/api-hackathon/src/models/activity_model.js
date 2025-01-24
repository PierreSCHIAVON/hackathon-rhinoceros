"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const zone_model_1 = require("./zone_model");
class Activity extends sequelize_1.Model {
}
exports.Activity = Activity;
Activity.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Activity',
    tableName: 'activities',
    timestamps: false,
});
Activity.belongsTo(zone_model_1.Zone, { foreignKey: 'zoneId' });
zone_model_1.Zone.hasMany(Activity, { foreignKey: 'zoneId' });
