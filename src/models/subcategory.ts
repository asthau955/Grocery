const { DataTypes } = require('sequelize');
import Category from "./category";
import { v4 as uuidv4 } from 'uuid';

const Subcategory: any = {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
};


export default Subcategory;