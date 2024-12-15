const { DataTypes } = require('sequelize');
import Category from "./category";
import Subcategory from "./subcategory";
import { v4 as uuidv4 } from 'uuid';

const Item: any = {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: Category,
          key: 'id',
      }
    },
    subcategory: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: Subcategory,
          key: 'id',
      },
    },
    outOfStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    productVariant: {
      type: DataTypes.JSON,
      allowNull: false,
    }
  };
  
export default Item;