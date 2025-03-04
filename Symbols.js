const sym1 = Symbol("id");
const sym2 = Symbol("id");

console.log(sym1 === sym2);

const id = Symbol("id");
const user = {
  name: "Varun",
  [id]: 101
};

console.log(user[id]);
