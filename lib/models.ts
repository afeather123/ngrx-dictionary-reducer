import {EntityState, Update} from '@ngrx/entity'
import {Action} from '@ngrx/store'

export type IdSelectorStr<T> = {
    (model: T): string;
};
  
export type IdSelectorNum<T> = {
    (model: T): number;
};

export type IdSelector<T> = IdSelectorStr<T> | IdSelectorNum<T>;

export type DictionaryNum<T> = {
    [id: number]: T;
  };
  
export abstract class Dictionary<T> implements DictionaryNum<T> {
    [id: string]: T;
}

export type DictionaryEntityState<T> = Dictionary<EntityState<T>>

export enum ChildActionTypes {
    Single,
    Many,
    SingleUpdate,
    ManyUpdate,
    Clear,
    Parent
}

export class ChildSingleAction<T> implements Action {
    readonly type
    readonly childType = ChildActionTypes.Single
    constructor(public payload: T) {}
}

export class ChildManyAction<T> implements Action {
    readonly type
    readonly childType = ChildActionTypes.Many
    constructor(public payload: T[]) {}
}

export class ChildClearAction implements Action {
    readonly type
    readonly childType = ChildActionTypes.Clear
}



export type ChildAction<Child> = ChildClearAction
                          | ChildManyAction<Child>
                          | ChildSingleAction<Child>

export type DictionaryEntityReducer<Child> =  {
    (state: DictionaryEntityState<Child>, 
    action: ChildAction<Child>): DictionaryEntityState<Child>
}

export type ChildReducer<T> = {
    (state: EntityState<T>, 
    action: ChildAction<T>): EntityState<T>
}