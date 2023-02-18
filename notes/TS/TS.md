# 类型体操中的注意点

1. 对于类型`T`,`keyof T`只能获取`T`中的公共属性的key值；
2. `T[K]`索引访问，可以接受数组，比如`T[keyof T]`可以获取`T`中的联合类型，如果遇到不存在的key值，会推断为any；
   1. 经过`{...}[keyof T]`的索引访问，获取到`T`的联合类型，并会去掉`never`;
3. 交叉类型`&`中有相同key值吗，但是类型不同，该key会被推断为never，无法同时满足两个不同的类型；
4. 类型的赋值操作：子类型可以赋值给父类型，父类型表示比子类型更加宽泛，在`interface`和`type`中的表现不同,`interface`的属性越少表示越宽泛，`type`联合类型越多越宽泛；
5. 类型的赋值操作：逆变和协变，简单理解为协变保持父子关系，逆变逆转父子关系，一般来说`type Fn<T> = (arg: T) => void`为逆变过程，其他为协变过程；
   1. `inter`推导的名称相同并且都处于协变位置，则结果为联合类型；
   2. `infer`推导的名称相同并且都处于逆变位置，则结果为交叉类型；
6. 类型推导中`K`作为key值参数使用，需要`K extends keyof any`表示`K`为对象的key值，不是任意类型都可以作为key值，所以需要`keyof`进行约束；
7. 同态与非同态，同态需要输入类型`T`来拷贝属性，属性修饰符会被一同拷贝，`readonly/?`等，例如`Pick`操作，非同态则比如`Record`操作；
8. `never`表示不存在的类型，与其他类型联合，就会消失；
9.  `infer`只能用在`extends`后面，表示TS自己推断的类型，用于暂存；
10. 判断两个类型是否相同：如果两个类型仅被用于约束两个相同的泛型函数则是相同的，比如
    ```TypeScript
    type A = <T>() => T extends X ? 1 : 2
    type B = <T>() => T extends Y ? 1 : 2
    type C = A extends B ? true :false
    ```
    可以用来判断`X`和`Y`是否完全相同
    1. `X`和`Y`的属性修饰符会一并比较
    2. 通过`extends`比较的方式不会比较修饰符，不能满足需求
11. 筛选可选类型：`{}`和`{key?:value}`是兼容的，可以用来筛选可选属性；
12. 类型分割的思想比较实用，可以用于两个类型间覆盖，查重之类；
13. `type B = A[number]`对数组进行索引访问，得到的是所有子项类型组成的联合类型；
14. 联合类型转变为交叉类型：构造一个逆变的联合类型，通过infer协变得到交叉类型：通过`infer`可以将逆变位置的类型合并为交叉类型的特性，所以需要先构造逆变位类型
    ```TypeScript
    type UnionToIntersection<T> = (T extends any
    ? (arg: T) => void
    : never
    ) extends (arg: infer U) => void ? U : never
    type Eg = UnionToIntersection<{ key1: string } | { key2: number }>
    ```