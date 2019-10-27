var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dojo/data/api/Item"], function (require, exports, Item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Item_1 = __importDefault(Item_1);
    /**
     * this is a type asssignable to a dojo-tree
     *
     * @author h.fleischer
     * @since 04.10.2019
     */
    var TreeDataImpl = /** @class */ (function (_super) {
        __extends(TreeDataImpl, _super);
        function TreeDataImpl(type, id, name, value, color, extent, valueFilter) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.type = type;
            _this.name = name;
            _this.value = value;
            _this.color = color;
            _this.extent = extent;
            _this.hex = color.getHex(); //needed for reference in LayoutChart, referenced as string prop, which will not evaluate until runtime, so private is OK
            _this.children = null; //dont initialize until addition of a child (chart wants to zoom in on empty children otherwise)
            _this.valueFilter = valueFilter;
            return _this;
        }
        TreeDataImpl.prototype.getId = function () {
            return this.id;
        };
        TreeDataImpl.prototype.getName = function () {
            return this.name;
        };
        TreeDataImpl.prototype.getValue = function () {
            return this.value;
        };
        TreeDataImpl.prototype.setColor = function (color) {
            this.color = color;
        };
        TreeDataImpl.prototype.getColor = function () {
            return this.color;
        };
        TreeDataImpl.prototype.setParent = function (id) {
            this.parent = id;
        };
        TreeDataImpl.prototype.getParent = function () {
            return this.parent;
        };
        TreeDataImpl.prototype.addChild = function (child) {
            child.setParent(this.id);
            if (this.children == null) {
                this.children = [];
            }
            this.children.push(child);
        };
        TreeDataImpl.prototype.getChildren = function () {
            return this.children;
        };
        TreeDataImpl.prototype.getChildrenRecursive = function () {
            var results = [];
            results.push(this);
            if (this.children != null) {
                this.children.forEach(function (child) {
                    results = results.concat(child.getChildrenRecursive());
                });
            }
            return results;
        };
        ;
        TreeDataImpl.prototype.getExtent = function () {
            return this.extent;
        };
        TreeDataImpl.prototype.getValueFilter = function () {
            return this.valueFilter;
        };
        return TreeDataImpl;
    }(Item_1.default));
    exports.TreeDataImpl = TreeDataImpl;
});
