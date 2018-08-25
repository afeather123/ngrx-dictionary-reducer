"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function selectIdValue(nested_entity, selectParentId) {
    const parent_id = selectParentId(nested_entity);
    if (parent_id === undefined) {
        console.log("WARNING! INVALID PARENT KEY WAS USED");
    }
    return parent_id;
}
exports.selectIdValue = selectIdValue;
function ParentSortMapEntities(entites, selectParentId) {
    return entites.reduce((acc, entity) => {
        const parent_id = selectIdValue(entity, selectParentId);
        if (!acc[parent_id])
            acc[parent_id] = [];
        acc[parent_id].push(entity);
        return acc;
    }, {});
}
exports.ParentSortMapEntities = ParentSortMapEntities;
