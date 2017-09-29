const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._tail = null;
        this._head = null;
    }

    append(data) {
        let node = new Node(data);
        let tNode = this._tail;
        if(this.length) {
            this._tail = node;
            this._tail.prev = tNode;
            this._tail.prev.next = this._tail;
        }
        else {
            this._tail = node;
            this._head = node;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        if (index>this.length || index<0)
            return false;
        let tNode = this._head;
        let tIndex = 0;
        while(tNode) {
            if(index == tIndex) return tNode.data;
            tNode = tNode.next;
            tIndex++;
        }
    }

    insertAt(index, data) {
        if (index > this.length || index < 0)
            return false;

        let tNode = this._head;
        let node = new Node(data);
        let tIndex = 0;

        while(tNode) {
            if(index == tIndex) {
                if (tNode.prev) {
                    node.prev = tNode.prev;
                    node.next = tNode;
                    tNode.prev.next = node;
                    tNode.prev = node;
                }
                //tNode.data = data;
                this.length++;
                break;
            }
            tNode = tNode.next;
            tIndex++;
        }
        return this;
    }

    isEmpty() {
        return this.length ? false : true;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let tNode = this._head;
        let tIndex = 0;
        while(tNode) {
            if(index == tIndex) {
                if (tNode.next) tNode.next.prev = tNode.prev;
                if (tNode.prev) tNode.prev.next = tNode.next;
                tNode = null;
                this.length--;
                break;
            }
            tNode = tNode.next;
            tIndex++;
        }
        return this;
    }

    reverse() {
        let current = this._head;
        this._head = this._tail;
        this._tail = current;
        let tNode= null;
        while (current) {
            tNode = current.prev;
            current.prev = current.next;
            current.next = tNode;
            current = current.prev;
        }
        return this;
    }

    indexOf(data) {
        let tNode = this._head;
        let tIndex = 0;
        while(tNode) {
            if(data == tNode.data) return tIndex;
            tNode = tNode.next;
            tIndex++;
        }

        return -1;
    }
}

module.exports = LinkedList;
