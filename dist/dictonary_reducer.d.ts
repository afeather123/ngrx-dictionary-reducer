import { IdSelector, ChildReducer, DictionaryEntityReducer } from './models';
export declare function CreateDictionaryEntityReducer<Child>(selectParentId: IdSelector<Child>, childActions: {
    [key: string]: string;
}, childReducer: ChildReducer<Child>): DictionaryEntityReducer<Child>;
