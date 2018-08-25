import { IdSelector } from './models';
export declare function selectIdValue<T>(nested_entity: T, selectParentId: IdSelector<T>): string | number;
export declare function ParentSortMapEntities<T>(entites: T[], selectParentId: IdSelector<T>): {};
