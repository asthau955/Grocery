import { itemSchema, orderSchema } from "../db/db"
import { create, find } from "../utils/common/core"

async function getAllActiveItems() {
    try {
        return await find(itemSchema)
    } catch (error: any) {
        throw { message: error?.message }
    }
}

async function createOrder(body: any, user: any) {
    try {
        if (!body || !Object.keys(body)) throw {message: "Required fields missing to add item", statusCode: 400}
        return await create(orderSchema, body, user)
    } catch (error: any) {
        throw { message: error?.message, statusCode: error?.statusCode }
    }
}

export {
    getAllActiveItems,
    createOrder
}