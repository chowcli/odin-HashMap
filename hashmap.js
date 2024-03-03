const LinkedList = require("./linkedList");

class HashMap {
  #loadFactor;
  #buckets;

  constructor() {
    const size = 16;
    this.#loadFactor = 0.75;
    this.#buckets = new Array(size).fill(null);
  }

  #highLoadFactor() {
    const storedKeys = this.keys().length;

    return storedKeys / this.#buckets.length > this.#loadFactor;
  }

  #resize() {
    const pairs = this.entries();

    this.#buckets = new Array(this.#buckets.length * 2).fill(null);

    pairs.forEach(([key, value]) => {
      const hashCode = this.hash(key);
      if (hashCode < 0 || hashCode >= this.#buckets.length) {
        throw new Error("Trying to access index out of bound");
      }

      if (!this.#buckets[hashCode]) this.#buckets[hashCode] = new LinkedList();

      this.#buckets[hashCode].append(key, value);
    });
  }

  hash(key) {
    let hashCode = 0;
    const bucketLength = this.#buckets.length;

    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucketLength;
    }

    return Math.abs(hashCode);
  }

  set(key, value) {
    const hashCode = this.hash(key);
    if (hashCode < 0 || hashCode >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!this.#buckets[hashCode]) {
      this.#buckets[hashCode] = new LinkedList();
      this.#buckets[hashCode].append(key, value);
    } else {
      const bucket = this.#buckets[hashCode];

      const node = bucket.find(key);
      if (node) {
        node.value = value;
        return;
      }

      bucket.append(key, value);
    }

    if (this.#highLoadFactor()) this.#resize();
  }

  get(key) {
    const bucket = this.#buckets[this.hash(key)];
    const findNode = bucket.find(key);

    return findNode ? findNode.value : null;
  }

  has(key) {
    const bucket = this.#buckets[this.hash(key)];
    const findNode = bucket.find(key);

    return Boolean(findNode);
  }

  remove(key) {
    const bucket = this.#buckets[this.hash(key)];

    if (bucket && bucket.find(key)) {
      bucket.remove(key);
      return true;
    }

    return false;
  }

  length() {
    let storedKeys = 0;

    this.#buckets.forEach(bucket => {
      if (bucket) storedKeys += bucket.size;
    });

    return storedKeys;
  }

  clear() {
    const size = 16;
    this.#buckets = new Array(size).fill(null);
  }

  keys() {
    const keysArr = [];

    this.#buckets.forEach(bucket => {
      if (bucket) {
        let temp = bucket.head;

        while (temp) {
          keysArr.push(temp.key);
          temp = temp.next;
        }
      }
    });

    return keysArr;
  }

  values() {
    const values = [];

    this.#buckets.forEach(bucket => {
      if (bucket) {
        let temp = bucket.head;

        while (temp) {
          values.push(temp.value);
          temp = temp.next;
        }
      }
    });

    return values;
  }

  entries() {
    const pairs = [];

    this.#buckets.forEach(bucket => {
      if (bucket) {
        let temp = bucket.head;

        while (temp) {
          pairs.push([temp.key, temp.value]);
          temp = temp.next;
        }
      }
    });

    return pairs;
  }
}
