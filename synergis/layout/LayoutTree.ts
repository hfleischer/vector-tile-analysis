import Tree from 'dijit/Tree';
import Observable from 'dojo/store/Observable';
import ObjectStoreModel from 'dijit/tree/ObjectStoreModel';
import Memory from 'dojo/store/Memory';
import ContentPane from 'dijit/layout/ContentPane';

import { Uid } from '../util/Uid';
import { IDataType } from '../vectortile/data/IDataType';
import { DataType } from '../vectortile/data/DataType';
import { ITreeIconNode } from './ITreeIconNode';
import { Color } from '../util/Color';
import { ITreeData } from '../vectortile/data/ITreeData';
import { TreeDataImpl } from '../vectortile/data/TreeDataImpl';

/**
 * implementation of ILayout around a dojo-tree
 * 
 * @author h.fleischer
 * @since 09.10.2019
 */
export class LayoutTree implements ILayout {

    static readonly ROOT_ID: string = 'root';

    readonly dojoElement: ContentPane;
    readonly htmlElement: HTMLDivElement;
    treeNodesById: Object = {};
    itemSelectCallback: Function;
    innerDivId: string;
    tree: Tree;
    memory: Memory<ITreeData>;
    store: any;

    constructor(parent: ILayout, region: string, title: string, style?: string) {

        this.htmlElement = document.createElement('div');
        this.htmlElement.setAttribute('id', 'layout_div_toc_' + Uid.random16());
        parent.getHtmlElement().appendChild(this.htmlElement);

        var dojoElementArgs = {
            showRoot : false,
            region: region,
            title: title,
            style: style,
            splitter: true
        };
        this.dojoElement = new ContentPane(dojoElementArgs, this.htmlElement);

    }

    focusItem(itemId: string): void {

        let foundItem: any = this.findItem(itemId);
        if (foundItem != null) {
            this.tree._expandNode(foundItem);
            document.getElementById(this.innerDivId).scrollTop = foundItem.contentNode.offsetTop;
        } else {
            console.warn('failed to focus item by id', itemId)
        }

    }

    findItem(itemId: string): any {
        return this.treeNodesById[itemId];
    }

    replaceData(treeDataList: ITreeData[]) {

        //destroy if already present
        if (this.tree) {
            this.tree.destroy();
        }
        this.treeNodesById = {};

        this.innerDivId = 'layout_div_toc_' + Uid.random16();
        this.htmlElement.innerHTML = '<div id="' + this.innerDivId + '"></div>';

        var flatItemList : ITreeData[] = [];

        var rootItem = new TreeDataImpl(DataType.get(DataType.INDEX_________UNKNOWN), LayoutTree.ROOT_ID, LayoutTree.ROOT_ID, 0, Color.white(), null, null);
        flatItemList.push(rootItem);

        treeDataList.forEach(treeData => {
            rootItem.addChild(treeData); //implicitly sets parent id
            flatItemList = flatItemList.concat(treeData.getChildrenRecursive());
        });

        //feed the store with a flat list of items
        this.memory = new Memory<ITreeData>({
            data: flatItemList,
            getChildren: function(item: ITreeData) {
                return this.query({
                    parent: item.getId() //query all items having this item's id as parent-item-id
                });
            }
        });
        this.store = new Observable(this.memory);

        //define the model around the store
        let model = new ObjectStoreModel({
            store: this.store,
            query: { id: rootItem.getId() },
            mayHaveChildren: function(item: ITreeData) {
                //kind of dangerous, because this relies on the internal ITreeData structure rather than the flat tree structure
                return item.getChildren() != null && item.getChildren().length > 0; 
            }   
        });

        //get hold of the _TreeNode constructor function (typescript would not accept the 'digit' package name otherwise)
        let TreeNode: Function = eval('dijit._TreeNode');

        let _this = this;
        var dojoElementArgs = {

            showRoot : false,
            style: 'height: 100%; width: 100%;',
            model: model,  
            getIconClass: function(item: any, opened: any) { /* https://dojotoolkit.org/api/?qs=1.7/dijit/Tree */
                //prevent icon class assignment, the icon-node is built by hand in the _createTreeNode function
                return '';
            },	
            onClick: function(item: any, tree: Tree, event: MouseEvent) {
                //console.log('item click', item);
                if (item.id  && _this.itemSelectCallback) {
                    _this.itemSelectCallback.call(null, item.id, event);
                }
            },            
            _adjustWidths: function() {
                //overridden to prevent scrollbars
                this._adjustWidthsTimer && (this._adjustWidthsTimer.remove(),
                delete this._adjustWidthsTimer);
                this.containerNode.style.width = "auto";
                this.containerNode.style.width = this.domNode.scrollWidth > this.domNode.offsetWidth ? "auto" : "99%"
            },
            _createTreeNode: function(data: any): object {

                var node = TreeNode.call(null, data);

                if (data.item.id) {
                    _this.treeNodesById[data.item.id] = node;
                }

                if (data.item.color) {
                    node.iconNode.style.color = data.item.color;
                } else {
                    node.iconNode.style.color = 'var(--icon-color)';
                }

                if (data.item.type) {

                    let dataType = <IDataType> data.item.type;

                    let iconNode = dataType.getIconNode(data.item);
                    if (iconNode != null) {
                        node.iconNode.appendChild(iconNode.getHtmlElement());
                    }
                    dataType.visitLabelNode(data.item, node.labelNode, node.contentNode);
                    let actionNode: ITreeIconNode = dataType.getActionNode(data.item);
                    if (actionNode != null) {
                        node.contentNode.appendChild(actionNode.getHtmlElement());
                    }

                }


                return node;
                
            } 
        }     
        
        this.tree = new Tree(dojoElementArgs, this.innerDivId);        
        this.tree.startup();

        //if there is a single tile in tree --> open immediately to save interactions
        let rootChildren: ITreeData[] = rootItem.getChildren();
        if (rootChildren != null && rootChildren.length == 1) {
            let singleChild: ITreeData = rootItem.getChildren()[0];
            let singleSubchildren: ITreeData[] = singleChild.getChildren();
            if (singleSubchildren != null && singleSubchildren.length > 0) { //it is not the "no active tiles" node (which wont have children)
                this.focusItem(singleChild.getId());
            }
        }

    }

    /**
     * add a single tree data item to this tree<br>
     * the data item must have it's parent id preset before this method is called or it cant be attached to the tree
     * @param treeData
     */
    addData(treeData: ITreeData) {
        this.store.add(treeData.getChildrenRecursive());
    }

    /**
     * experimental
     * TODO maybe remove the entire flat list of items
     */
    remove(itemId: string) {
        this.store.remove(itemId);
    }

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

    getHtmlElement(): HTMLDivElement {
        return null;
    }

}
