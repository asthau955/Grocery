import Item from "./item";
import User from "./user";
import { v4 as uuidv4 } from 'uuid';

const { DataTypes } = require('sequelize');

const Order: any = {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
    },
    items: {
        type: DataTypes.JSON
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    payment_details: {
        type: DataTypes.JSON,
        allowNull: false,
    }
};

export default Order;