async function find(table: any, filter = {}, orderby = []) {
    return table.findAll(filter ? {where: filter} : {})
}

async function create(table: any, body: any,  user?: any) {
    body.createdby = user?.id
    return table.create(body)
}

async function update(table: any, body: any,  user: any) {
    body.updatedby = user?.id
    return table.update(body, {where: {id: body.id}})
}

async function remove(table: any, body: any,  user: any) {
    return table.destroy({where: {id: body.id}})
}

export {
    find,
    create,
    update,
    remove
}