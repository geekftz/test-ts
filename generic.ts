// ########################################################################
// 基本用法

// function loggingIdentity<T>(arg: T): T {
//   console.log(arg.length); // error: Property 'length' does not exist on type 'T'.
//   return arg;
// }

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // error: Property 'length' does not exist on type 'T'.
  return arg;
}

// ########################################################################
// 泛型变量

interface GenericIdentityFn<T> {
  (arg: T): T;
}
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: GenericIdentityFn<number> = identity;
let myIdentity2: GenericIdentityFn<string> = identity;

// ########################################################################
// 泛型类

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

// ########################################################################
// 泛型约束

interface Lengthwise {
  length: number;
}

function LengthwiseChild<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity(3); // Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.

LengthwiseChild({
  length: 1,
  name: "length wise",
});

// ########################################################################
// 在泛型约束中使用类型参数

function getProperty<T, Key extends keyof T>(obj: T, key: Key) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
getProperty(x, "m"); // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.

// 在泛型里使用类类型
function create<T>(c: { new (): T }): T {
  return new c();
}

class BeeKeeper {
  hasMask: boolean = true;
}
class ZooKeeper {
  nameTag: string = "Mike";
}
class Animal {
  numLegs: number = 4;
}
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nameTag;
createInstance(Bee).keeper.hasMask;
