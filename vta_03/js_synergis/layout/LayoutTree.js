var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "dijit/Tree", "dojo/store/Observable", "dijit/tree/ObjectStoreModel", "dojo/store/Memory", "dijit/layout/ContentPane", "../util/Uid", "../vectortile/data/DataType", "../util/Color", "../vectortile/data/TreeDataImpl"], function (require, exports, Tree_1, Observable_1, ObjectStoreModel_1, Memory_1, ContentPane_1, Uid_1, DataType_1, Color_1, TreeDataImpl_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Tree_1 = __importDefault(Tree_1);
    Observable_1 = __importDefault(Observable_1);
    ObjectStoreModel_1 = __importDefault(ObjectStoreModel_1);
    Memory_1 = __importDefault(Memory_1);
    ContentPane_1 = __importDefault(ContentPane_1);
    /**
     * implementation of ILayout around a dojo-tree
     *
     * @author h.fleischer
     * @since 09.10.2019
     */
    var LayoutTree = /** @class */ (function () {
        function LayoutTree(parent, region, title, style) {
            this.treeNodesById = {};
            this.htmlElement = document.createElement('div');
            this.htmlElement.setAttribute('id', 'layout_div_toc_' + Uid_1.Uid.random16());
            parent.getHtmlElement().appendChild(this.htmlElement);
            var dojoElementArgs = {
                showRoot: false,
                region: region,
                title: title,
                style: style,
                splitter: true
            };
            this.dojoElement = new ContentPane_1.default(dojoElementArgs, this.htmlElement);
        }
        LayoutTree.prototype.focusItem = function (itemId) {
            var foundItem = this.findItem(itemId);
            if (foundItem != null) {
                this.tree._expandNode(foundItem);
                document.getElementById(this.innerDivId).scrollTop = foundItem.contentNode.offsetTop;
            }
            else {
                console.warn('failed to focus item by id', itemId);
            }
        };
        LayoutTree.prototype.findItem = function (itemId) {
            return this.treeNodesById[itemId];
        };
        LayoutTree.prototype.replaceData = function (treeDataList) {
            //destroy if already present
            if (this.tree) {
                this.tree.destroy();
            }
            this.treeNodesById = {};
            this.innerDivId = 'layout_div_toc_' + Uid_1.Uid.random16();
            this.htmlElement.innerHTML = '<div id="' + this.innerDivId + '"></div>';
            var flatItemList = [];
            var rootItem = new TreeDataImpl_1.TreeDataImpl(DataType_1.DataType.get(DataType_1.DataType.INDEX_________UNKNOWN), LayoutTree.ROOT_ID, LayoutTree.ROOT_ID, 0, Color_1.Color.white(), null, null);
            flatItemList.push(rootItem);
            treeDataList.forEach(function (treeData) {
                rootItem.addChild(treeData); //implicitly sets parent id
                flatItemList = flatItemList.concat(treeData.getChildrenRecursive());
            });
            //feed the store with a flat list of items
            this.memory = new Memory_1.default({
                data: flatItemList,
                getChildren: function (item) {
                    return this.query({
                        parent: item.getId() //query all items having this item's id as parent-item-id
                    });
                }
            });
            this.store = new Observable_1.default(this.memory);
            //define the model around the store
            var model = new ObjectStoreModel_1.default({
                store: this.store,
                query: { id: rootItem.getId() },
                mayHaveChildren: function (item) {
                    //kind of dangerous, because this relies on the internal ITreeData structure rather than the flat tree structure
                    return item.getChildren() != null && item.getChildren().length > 0;
                }
            });
            //get hold of the _TreeNode constructor function (typescript would not accept the 'digit' package name otherwise)
            var TreeNode = eval('dijit._TreeNode');
            var _this = this;
            var dojoElementArgs = {
                showRoot: false,
                style: 'height: 100%; width: 100%;',
                model: model,
                getIconClass: function (item, opened) {
                    //prevent icon class assignment, the icon-node is built by hand in the _createTreeNode function
                    return '';
                },
                onClick: function (item, tree, event) {
                    //console.log('item click', item);
                    if (item.id && _this.itemSelectCallback) {
                        _this.itemSelectCallback.call(null, item.id, event);
                    }
                },
                _adjustWidths: function () {
                    //overridden to prevent scrollbars
                    this._adjustWidthsTimer && (this._adjustWidthsTimer.remove(),
                        delete this._adjustWidthsTimer);
                    this.containerNode.style.width = "auto";
                    this.containerNode.style.width = this.domNode.scrollWidth > this.domNode.offsetWidth ? "auto" : "99%";
                },
                _createTreeNode: function (data) {
                    var node = TreeNode.call(null, data);
                    if (data.item.id) {
                        _this.treeNodesById[data.item.id] = node;
                    }
                    if (data.item.color) {
                        node.iconNode.style.color = data.item.color;
                    }
                    else {
                        node.iconNode.style.color = 'var(--icon-color)';
                    }
                    if (data.item.type) {
                        var dataType = data.item.type;
                        var iconNode = dataType.getIconNode(data.item);
                        if (iconNode != null) {
                            node.iconNode.appendChild(iconNode.getHtmlElement());
                        }
                        dataType.visitLabelNode(data.item, node.labelNode, node.contentNode);
                        var actionNode = dataType.getActionNode(data.item);
                        if (actionNode != null) {
                            node.contentNode.appendChild(actionNode.getHtmlElement());
                        }
                    }
                    return node;
                }
            };
            this.tree = new Tree_1.default(dojoElementArgs, this.innerDivId);
            this.tree.startup();
            //if there is a single tile in tree --> open immediately to save interactions
            var rootChildren = rootItem.getChildren();
            if (rootChildren != null && rootChildren.length == 1) {
                var singleChild = rootItem.getChildren()[0];
                var singleSubchildren = singleChild.getChildren();
                if (singleSubchildren != null && singleSubchildren.length > 0) { //it is not the "no active tiles" node (which wont have children)
                    this.focusItem(singleChild.getId());
                }
            }
        };
        /**
         * add a single tree data item to this tree<br>
         * the data item must have it's parent id preset before this method is called or it cant be attached to the tree
         * @param treeData
         */
        LayoutTree.prototype.addData = function (treeData) {
            this.store.add(treeData.getChildrenRecursive());
        };
        /**
         * experimental
         * TODO maybe remove the entire flat list of items
         */
        LayoutTree.prototype.remove = function (itemId) {
            this.store.remove(itemId);
        };
        /*
        addSubrootItem(subRootItem: ITreeData) {
            this.subrootItems.splice(0, 0, subRootItem);
            //this.subrootItems.push(subRootItem);
            this.tree.rootNode.setChildItems(this.subrootItems);
        }
    
        removeSubrootItem(subRootItem: ITreeData) {
            let removableIndex: number = this.subrootItems.indexOf(subRootItem);
            this.subrootItems.splice(removableIndex,1);
            this.tree.rootNode.setChildItems(this.subrootItems);
        }
        */
        LayoutTree.prototype.getHtmlElement = function () {
            return null;
        };
        LayoutTree.ROOT_ID = 'root';
        return LayoutTree;
    }());
    exports.LayoutTree = LayoutTree;
});
