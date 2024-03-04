const HashMap = require("./hashmap");

const map = new HashMap();
map.set("banana", 22);
map.set("pineapple", 5);
map.set("apple", 35);
map.set("orange", 17);
map.set("coconut", 10);
map.set("kiwi", 2);
map.set("durian", 5);
map.set("cherry", 100);
map.set("pear", 25);
map.set("grape", 14);

console.log(map.get("kiwi"));
console.log(map.get("pear"));
console.log(map.get("cherry"));
console.log(map.has("durian"));
console.log(map.has("coconuts"), "\n");

console.log("Map length:", map.length());
console.log("All fruit name:", map.keys());
console.log("All fruit quantity:", map.values());
console.log("All fruit name and quantity:", map.entries(), "\n");

console.log(map.remove("kiwi"));
console.log(map.remove("grape"));
console.log(map.remove("pineapple"));
console.log(map.remove("bananas"));
console.log("Map length:", map.length());
console.log("All fruit name:", map.keys());
console.log("All fruit quantity:", map.values());
console.log("All fruit name and quantity:", map.entries(), "\n");

map.clear();
console.log("Map length after clear:", map.length());
