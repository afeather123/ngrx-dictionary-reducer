"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const utils_1 = require("./utils");
function CreateNestedEntityReducer(selectParentId, childActions, childReducer) {
    return function (state = {}, action) {
        //Parent actions
        if (action.type in childActions) {
            switch (action.childType) {
                case models_1.ChildActionTypes.Many:
                    {
                        console.log('Doing something with many!');
                        const sorted = utils_1.ParentSortMapEntities(action.payload, selectParentId);
                        const new_state = {};
                        for (let parent_id in sorted) {
                            new_state[parent_id] = childReducer(state[parent_id], Object.assign({}, action, { payload: sorted[parent_id] }));
                        }
                        return Object.assign({}, state, new_state);
                    }
                case models_1.ChildActionTypes.Single:
                    {
                        const parent_id = utils_1.selectIdValue(action.payload, selectParentId);
                        const new_state = {};
                        new_state[parent_id] = childReducer(state[parent_id], action);
                        return Object.assign({}, state, new_state);
                    }
                case models_1.ChildActionTypes.ManyUpdate:
                    {
                        const filteredPayloads = action.payload.reduce((acc, update) => {
                            const parent_id = utils_1.selectIdValue(update.target, selectParentId);
                            if (!acc[parent_id])
                                acc[parent_id] = [];
                            acc[parent_id].push(update);
                            return acc;
                        }, {});
                        let new_state = Object.assign({}, state);
                        for (let key in filteredPayloads) {
                            new_state[key] = childReducer(state[key], Object.assign({}, action, { payload: filteredPayloads[key] }));
                        }
                        return new_state;
                    }
                case models_1.ChildActionTypes.SingleUpdate:
                    {
                        const parent_id = utils_1.selectIdValue(action.target, selectParentId);
                        const new_state = Object.assign({}, state);
                        new_state[parent_id] = childReducer(state[parent_id], action);
                        return new_state;
                    }
            }
        }
        return state;
    };
}
exports.CreateNestedEntityReducer = CreateNestedEntityReducer;
