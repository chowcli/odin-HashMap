const Node = require("./llist-node");

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(key, value) {
    if (this.head) {
      this.tail = this.tail.next = new Node(key, value);
      this.size++;
    } else {
      this.head = this.tail = new Node(key, value);
      this.size++;
    }
  }

  // Return node with correct key, otherwise return null
  find(key) {
    let temp = this.head;

    while (temp) {
      if (temp.key === key) return temp;

      temp = temp.next;
    }

    return null;
  }

  // Remove node with correct key
  remove(key) {
    const removedNode = this.find(key);

    if (removedNode === this.head) {
      this.head = this.head.next;
      if (!this.head) this.tail = null; // if the list after update is empty
      this.size--;
    }

    let temp = this.head;
    while (temp.next !== removedNode) {
      temp = temp.next;
    }
    temp.next = removedNode.next;

    if (!removedNode.next) this.tail = temp; // if removedNode is also the tail
    this.size--;
  }
}

module.exports = LinkedList;
