// 下划线转驼峰的类型推导和工具函数

// 辅助类型，递归转下划线为大驼峰
type ToGreatHump<T extends string> = T extends `${infer Q}_${infer P}`
  ? P['length'] extends 0
    ? Q
    : ToGreatHump<`${Q}${Capitalize<P>}`>
  : Capitalize<T>;
// 下划线数组转大驼峰Map
type ArrayToObj<T extends readonly string[]> = {
  -readonly [K in T[number] as ToGreatHump<K>]: K;
};
const testArray = ['as_bs2_c23'] as const;

export type HumpMap = ArrayToObj<typeof testArray>;

export const HumpObj = testArray.reduce((pre, cur) => {
  if (cur) {
    const key = `_${cur}`.replace(/_(\w)/g, (match, letter) => {
      return letter.toUpperCase();
    });
    pre[key] = cur;
  }
  return pre;
}, {} as HumpMap);
