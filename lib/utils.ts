import {IdSelector} from './models'

export function selectIdValue<T> (nested_entity: T, selectParentId: IdSelector<T>) {
    const parent_id = selectParentId(nested_entity)
    if(parent_id === undefined) {
        console.log("WARNING! INVALID PARENT KEY WAS USED")
    }
    return parent_id
}

export function ParentSortMapEntities<T>(entites: T[], selectParentId: IdSelector<T>) {
    return entites.reduce((acc, entity) => {
        const parent_id = selectIdValue(entity, selectParentId)
        if(!acc[parent_id]) acc[parent_id] = []
        acc[parent_id].push(entity)
        return acc
    }, {})
}