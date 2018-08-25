"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const utils_1 = require("./utils");
function CreateDictionaryEntityReducer(selectParentId, childActions, childReducer) {
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
            }
        }
        return state;
    };
}
exports.CreateDictionaryEntityReducer = CreateDictionaryEntityReducer;
