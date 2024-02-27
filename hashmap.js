const LinkedList = require("./linkedList");

class HashMap {
  #loadFactor;
  #buckets;

  constructor() {
    const size = 16;
    this.#loadFactor = 0.75;
    this.#buckets = new Array(size).fill(null);
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
  }

  get(key) {
    const bucket = this.#buckets[this.hash(key)];

    if (bucket) return bucket.find(key);

    return null;
  }

  has(key) {
    const bucket = this.#buckets[this.hash(key)];

    if (bucket) return Boolean(bucket.find(key));

    return false;
  }
}
