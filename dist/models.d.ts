import { EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
export declare type IdSelectorStr<T> = {
    (model: T): string;
};
export declare type IdSelectorNum<T> = {
    (model: T): number;
};
export declare type IdSelector<T> = IdSelectorStr<T> | IdSelectorNum<T>;
export declare type DictionaryNum<T> = {
    [id: number]: T;
};
export declare abstract class Dictionary<T> implements DictionaryNum<T> {
    [id: string]: T;
}
export declare type DictionaryEntityState<T> = Dictionary<EntityState<T>>;
export declare enum ChildActionTypes {
    Single = 0,
    Many = 1,
    SingleUpdate = 2,
    ManyUpdate = 3,
    Clear = 4,
    Parent = 5
}
export declare class ChildSingleAction<T> implements Action {
    payload: T;
    readonly type: any;
    readonly childType: ChildActionTypes;
    constructor(payload: T);
}
export declare class ChildManyAction<T> implements Action {
    payload: T[];
    readonly type: any;
    readonly childType: ChildActionTypes;
    constructor(payload: T[]);
}
export declare class ChildClearAction implements Action {
    readonly type: any;
    readonly childType: ChildActionTypes;
}
export declare type ChildAction<Child> = ChildClearAction | ChildManyAction<Child> | ChildSingleAction<Child>;
export declare type DictionaryEntityReducer<Child> = {
    (state: DictionaryEntityState<Child>, action: ChildAction<Child>): DictionaryEntityState<Child>;
};
export declare type ChildReducer<T> = {
    (state: EntityState<T>, action: ChildAction<T>): EntityState<T>;
};
