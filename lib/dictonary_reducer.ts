import {IdSelector, 
    ChildReducer, 
    DictionaryEntityReducer, 
    DictionaryEntityState, 
    ChildAction, 
    ChildActionTypes
    } from './models'
import {ParentSortMapEntities, selectIdValue} from './utils'

export function CreateDictionaryEntityReducer<Child>(
    selectParentId: IdSelector<Child>,
    childActions: {[key:string]: string},
    childReducer: ChildReducer<Child>
): DictionaryEntityReducer<Child>;

export function CreateDictionaryEntityReducer<Child>(
    selectParentId: IdSelector<Child>,
    childActions: {[key:string]: string},
    childReducer: ChildReducer<Child>
) {
    return function(state: DictionaryEntityState<Child> = {}, action: ChildAction<Child>) {
        //Parent actions
        if(action.type in childActions) {
            switch(action.childType) {
                case ChildActionTypes.Many:
                {
                    console.log('Doing something with many!')
                    const sorted = ParentSortMapEntities(action.payload, selectParentId)
                    const new_state = {}
                    for(let parent_id in sorted) {
                        new_state[parent_id] = childReducer(state[parent_id], {...action, payload: sorted[parent_id]}) 
                    }
                    return Object.assign({}, state, new_state)
                }
                case ChildActionTypes.Single:
                {
                    const parent_id = selectIdValue(action.payload, selectParentId)
                    const new_state = {}
                    new_state[parent_id] = childReducer(state[parent_id], action)
                    return Object.assign({}, state, new_state)
                }
                case ChildActionTypes.ManyUpdate:
                {
                    const filteredPayloads = action.payload.reduce((acc, update) => {
                        const parent_id = selectIdValue(update.target, selectParentId)
                        if(!acc[parent_id]) acc[parent_id] = []
                        acc[parent_id].push(update)
                        return acc
                    }, {})
                    let new_state = {...state}
                    for(let key in filteredPayloads) {
                        new_state[key] = childReducer(state[key], {...action, payload: filteredPayloads[key]})
                    }
                    return new_state
                }
                case ChildActionTypes.SingleUpdate:
                {
                    const parent_id = selectIdValue(action.target, selectParentId)
                    const new_state = {...state}
                    new_state[parent_id] = childReducer(state[parent_id], action)
                    return new_state
                }
            }
        }
        return  state
    }
}
