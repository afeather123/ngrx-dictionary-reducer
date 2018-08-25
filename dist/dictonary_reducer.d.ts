import { IdSelector, ChildReducer, NestedEntityReducer } from './models';
export declare function CreateNestedEntityReducer<Child>(selectParentId: IdSelector<Child>, childActions: {
    [key: string]: string;
}, childReducer: ChildReducer<Child>): NestedEntityReducer<Child>;
