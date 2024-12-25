import { Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/user';
import Order from '../models/order';
import Category from '../models/category';
import Subcategory from '../models/subcategory';
import Item from '../models/item';
import { subcategoryData } from '../utils/testData/subcategories';
import { itemsData } from '../utils/testData/groceryItems';
import { categoryData } from '../utils/testData/categories';
import { userData } from '../utils/testData/users';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

// Initialize Sequelize
let sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // database: process.env.DB_NAME,
    logging: false
});
let userSchema: any;
let orderSchema: any;
let categorySchema: any;
let subcategorySchema: any;
let itemSchema: any;

const defineSchema = (table: string, schema: any, tableName: string) => {
    return sequelize.define(table, schema, {
        tableName: tableName,
        timestamps: false,
    })
}

const schemaAndTestDataCreation = async () => {
    try {
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database "${process.env.DB_NAME}" ensured.`);
        sequelize = new Sequelize({
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            dialect: 'mysql',
            database: process.env.DB_NAME,
            logging: false
        });
        await sequelize.authenticate();
        console.log('Connected to the database.');
        userSchema = defineSchema('User', User, 'users')
        orderSchema = defineSchema('Order', Order, 'orders')
        categorySchema = defineSchema('Category', Category, 'categories')
        subcategorySchema = defineSchema('Subcategory', Subcategory, 'subcategories')
        itemSchema = defineSchema('Item', Item, 'items')

        // Relationships
        // Users ↔ Orders
        userSchema.hasMany(orderSchema, { foreignKey: 'user_id' });
        orderSchema.belongsTo(userSchema, { foreignKey: 'user_id' });

        // Category ↔ Subcategory
        categorySchema.hasMany(subcategorySchema, { foreignKey: 'category_id' });
        subcategorySchema.belongsTo(categorySchema, { foreignKey: 'category_id' });

        // Category ↔ Items
        categorySchema.hasMany(itemSchema, { foreignKey: 'category' });
        itemSchema.belongsTo(categorySchema, { foreignKey: 'category' });

        // Subcategory ↔ Items
        subcategorySchema.hasMany(itemSchema, { foreignKey: 'subcategory' });
        itemSchema.belongsTo(subcategorySchema, { foreignKey: 'subcategory' });
        if (process.env.PLATFORM === 'test') {
            await sequelize.drop()
        }
        await sequelize.sync({ alter: true });
        console.log('Tables upserted successfully.');

        if (process.env.PLATFORM === 'test') {
            // Test user creation
            await userSchema.bulkCreate(userData);
            console.log('Test Users created successfully');

            // Test category creation
            const category: any = await categorySchema.bulkCreate(categoryData);
            console.log('Test Categories created successfully');
            let subcategories: any = []

            // Injecting category_id in subcategories
            for (let index = 0; index < category.length; index++) {
                subcategoryData[index].forEach((_s: any) => {
                    _s.category_id = category[index].dataValues.id
                })
                subcategories = [...subcategories, ...subcategoryData[index]]
            }

            // Test subcategory creation
            const subcategory = await subcategorySchema.bulkCreate(subcategories);
            console.log('Test subcategories created successfully');

            // Injecting sub category in items
            let items: any = []
            for (let index = 0; index < subcategory.length; index++) {
                itemsData[index] = JSON.parse(itemsData[index])
                itemsData[index].forEach((_i: any) => {
                    _i.id = uuidv4()
                    _i.subcategory = subcategory[index].dataValues.id
                    _i.category = subcategory[index].dataValues.category_id
                }
                )
                items = [...items, ...itemsData[index]]
            }

            // Test items creation
            await itemSchema.bulkCreate(items);
            console.log('Test items created successfully');
        }


    } catch (error) {
        console.error('Error in schemaAndTestDataCreation:', error);
    } finally {
        //   await sequelize.close();
    }
};

export {
    userSchema,
    orderSchema,
    categorySchema,
    subcategorySchema,
    itemSchema,
    schemaAndTestDataCreation
};