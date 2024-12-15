import { itemSchema } from "../db/db"
import { create, find, update, remove } from "../utils/common/core"

async function getAllItems() {
    try {
        return await find(itemSchema)
    } catch (error: any) {
        throw { message: error?.message }
    }
}

async function addItem(body: any, user: any) {
    try {
        if (!body || !Object.keys(body)) throw {message: "Required fields missing to add item", statusCode: 400}
        return await create(itemSchema, body, user)
    } catch (error: any) {
        throw { message: error?.message, statusCode: error?.statusCode }
    }
}

async function updateItem(body: any, user: any) {
    try {
        if (!body?.id) throw {message: "Required field [id] missing to update item", statusCode: 400}
        return await update(itemSchema, body, user)
    } catch (error: any) {
        throw { message: error?.message, statusCode: error?.statusCode }
    }
}

async function deleteItems(body: any, user: any) {
    try {
        if (!body?.id) throw {message: "Required field [id] missing to delete item", statusCode: 400}
        return await remove(itemSchema, body, user)
    } catch (error: any) {
        throw { message: error?.message, statusCode: error?.statusCode }
    }
}

export {
    getAllItems,
    addItem,
    deleteItems,
    updateItem
}