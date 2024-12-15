const { DataTypes } = require('sequelize');
import { v4 as uuidv4 } from 'uuid';

const Category: any = {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
};

export default Category;