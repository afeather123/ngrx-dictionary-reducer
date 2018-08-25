"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dictionary {
}
exports.Dictionary = Dictionary;
var ChildActionTypes;
(function (ChildActionTypes) {
    ChildActionTypes[ChildActionTypes["Single"] = 0] = "Single";
    ChildActionTypes[ChildActionTypes["Many"] = 1] = "Many";
    ChildActionTypes[ChildActionTypes["SingleUpdate"] = 2] = "SingleUpdate";
    ChildActionTypes[ChildActionTypes["ManyUpdate"] = 3] = "ManyUpdate";
    ChildActionTypes[ChildActionTypes["Clear"] = 4] = "Clear";
    ChildActionTypes[ChildActionTypes["Parent"] = 5] = "Parent";
})(ChildActionTypes = exports.ChildActionTypes || (exports.ChildActionTypes = {}));
class ChildSingleAction {
    constructor(payload) {
        this.payload = payload;
        this.childType = ChildActionTypes.Single;
    }
}
exports.ChildSingleAction = ChildSingleAction;
class ChildManyAction {
    constructor(payload) {
        this.payload = payload;
        this.childType = ChildActionTypes.Many;
    }
}
exports.ChildManyAction = ChildManyAction;
class ChildSingleUpdateAction {
    constructor(payload, target) {
        this.payload = payload;
        this.target = target;
        this.childType = ChildActionTypes.SingleUpdate;
    }
}
exports.ChildSingleUpdateAction = ChildSingleUpdateAction;
class ChildManyUpdateAction {
    constructor(payload) {
        this.payload = payload;
        this.childType = ChildActionTypes.ManyUpdate;
    }
}
exports.ChildManyUpdateAction = ChildManyUpdateAction;
class ChildClearAction {
    constructor() {
        this.childType = ChildActionTypes.Clear;
    }
}
exports.ChildClearAction = ChildClearAction;
