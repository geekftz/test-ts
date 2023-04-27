abstract class Parent {
  abstract wearClothes(): void;
  abstract brushTeeth(): void;

  getUp() {
    this.wearClothes();
    this.brushTeeth();
  }
}

class Children extends Parent {
  // constructor() {
  //   super();
  // }

  wearClothes() {
    console.log(" wear Clothes ");
  }

  brushTeeth() {
    console.log(" brush Teeth ");
  }
}

const children = new Children();

children.getUp();

// 接口继承 ########################################

interface T1 {
  name: string;
}

interface T2 {
  sex: number;
}

// 多重继承，逗号隔开
interface T3 extends T1, T2 {
  age: number;
}

// 合法
const t3: T3 = {
  name: "xiaoming",
  sex: 1,
  age: 18,
};

// 条件判断 ########################################

// 示例1
interface Animal {
  eat(): void;
}

interface Dog extends Animal {
  bite(): void;
}

// A1的类型为string
type B = Dog extends Animal ? string : number;
const b: B = "this is string";

//

// 示例2
interface C {
  name: string;
}

interface D {
  name: string;
  age: number;
}
// A2的类型为string
type E = D extends C ? string : number;

const e: E = "this is string";

// 分配条件类型 ########################################

type A1 = "x" extends "x" ? string : number; // string
type A2 = "x" | "y" extends "x" ? string : number; // number

type P11<T> = T extends "x" ? string : number;
type A3 = P11<"x" | "y">; // ?

// 特殊的never ########################################

// never是所有类型的子类型
type A11 = never extends "x" ? string : number; // string

type P22<T> = T extends "x" ? string : number;
type A22 = P22<never>; // never

// 在高级类型中的应用 ########################################

// Exclude
// 是TS中的一个高级类型，其作用是从第一个联合类型参数中，将第二个联合类型中出现的联合项全部排除，只留下没有出现过的参数。
type A111 = `Exclude<'key1' | 'key2', 'key2'>`

// 等价于

type A222 = `Exclude<'key1', 'key2'>` | `Exclude<'key2', 'key2'>`

// =>

type A333 = ('key1' extends 'key2' ? never : 'key1') | ('key2' extends 'key2' ? never : 'key2')

// =>

// never是所有类型的子类型
type A444 = 'key1' | never = 'key1'

// Extract
// 高级类型Extract和上面的Exclude刚好相反，它是将第二个参数的联合项从第一个参数的联合项中提取出来，当然，第二个参数可以含有第一个参数没有的项。

type Extract1<T, U> = T extends U ? T : never
type A33 = Extract1<'key1' | 'key2', 'key1'> // 'key1'

// Pick
// extends的条件判断，除了定义条件类型，还能在泛型表达式中用来约束泛型参数

// 高级类型Pick的定义
type Pick1<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface A4 {
  name: string;
  age: number;
  sex: number;
}

type A12 = Pick1<A4, 'name'|'age'>
// 报错：类型“"key" | "noSuchKey"”不满足约束“keyof A”
type A23 = Pick1<A4, 'name'|'noSuchKey'>