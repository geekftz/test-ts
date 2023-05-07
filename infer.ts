type Ids = number[];
type Names = string[];
type flags = boolean[];

// ########################################################################
// 推断类型

// type Unpacked<T> = T extends Names ? string : T extends Ids ? number : T;

// type idType = Unpacked<Ids>; // idType 类型为 number
// type nameType = Unpacked<Names>; // nameType 类型为string
// type newType = Unpacked<flags>; // unpacked failed, return initial type

// ########################################################################
// infer解包

// type Unpacked<T> = T extends (infer R)[] ? R : T;

// type idType = Unpacked<Ids>; // idType 类型为 number
// type nameType = Unpacked<Names>; // nameType 类型为string
// type newType = Unpacked<flags>; // unpacked failed, return initial type

// ########################################################################

type Unpacked<T> = T extends Promise<infer R> ? R : T;

type Resp = Promise<number[]>;
type resType = Unpacked<Resp>; // resType 类型为number[]

// ########################################################################
// 同一个类型变量在推断的值有多种情况的时候会推断为联合类型，针对这个特性，很方便的可以将元组转为联合类型

type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

type T10 = Foo<{ a: string; b: string }>; // T10类型为 string
type T11 = Foo<{ a: string; b: number }>; // T11类型为 string | number

// ########################################################################
// React中infer的使用

const reducer = (x: number) => x + 1;
// @ts-ignore
const [state, dispatch] = useReducer(reducer, "");
// Argument of type "" is not assignable to parameter of type 'number'.

// react source code
// @ts-ignore
function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  // ReducerState 推断类型
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
  // @ts-ignore
): [ReducerState<R>, Dispatch<ReducerAction<R>>];

// infer推断
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any>
  ? S
  : never;
// Reducer类型
type Reducer<S, A> = (prevState: S, action: A) => S;

// ########################################################################
// ant-design-chart

// 已知
// type ref = React.MutableRefObject<G2plotStackedBar | undefined>;
// 求 ???
// const chartRef = useRef<???>()

// infer推断
// @ts-ignore
type ChartRef<T> = T extends React.MutableRefObject<infer P> ? P : never;
// @ts-ignore
const chartRef = useRef<ChartRef<ref>>();
