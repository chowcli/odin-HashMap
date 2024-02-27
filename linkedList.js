const Node = require("./llist-node");

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(key, value) {
    if (this.head) {
      this.tail = this.tail.next = new Node(key, value);
    } else {
      this.head = this.tail = new Node(key, value);
    }
  }

  // Return node with correct key, otherwise return null
  find(key) {
    let temp = this.head;

    while (temp.next) {
      if (temp.key === key) return temp;

      temp = temp.next;
    }

    return null;
  }
}

module.exports = LinkedList;
