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
    if (!removedNode) return;

    if (removedNode === this.head) {
      this.head = this.head.next;
      if (!this.head) this.tail = null; // if the list after update is empty
      this.size--;
      return;
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

// const list = new LinkedList();
// list.append("banana", 22);
// list.append("pineapple", 5);
// list.append("apple", 35);
// list.append("orange", 17);
// list.append("coconut", 10);
// list.append("kiwi", 2);
// list.append("durian", 5);
// list.append("cherry", 100);
// list.append("pear", 25);
// list.append("grape", 14);

// console.log(list.find("banana"));
// console.log(list.find("coconut"));
// console.log(list.find("cherries"));
// console.log(list.find("grapes"), "\n");

// console.log("Head:", list.head);
// console.log("Tail:", list.tail);
// console.log("Size:", list.size, "\n");

// list.remove("banana");
// list.remove("apple");
// list.remove("grape");

// console.log("Head:", list.head);
// console.log("Tail:", list.tail);
// console.log("Size:", list.size, "\n");
