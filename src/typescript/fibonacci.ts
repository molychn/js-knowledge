// Fibonacci
// 如果判断是1和2则返回1，其余进入递归阶段
type 斐波那契<某数 extends number> = 某数 extends 1
    ? 1
    : 某数 extends 2
        ? 1
        // Fibonacci(n - 1) + Fibonacci(n - 2)
        : 相加<斐波那契<减一<某数>>, 斐波那契<减一<减一<某数>>>>;

// ts中数组类型可返回length属性
type 得到长度<数组 extends any[]> = 数组['length'];

type 转数组<
    某数 extends number,
    对应数组 extends any[] = []
> = 得到长度<对应数组> extends 某数 // 确保了数组的长度和某数是相等的
    ? 对应数组
    : 转数组<某数, [any, ...对应数组]>; // 利用递归根据某数次数传入any元素进数组

type arr = 转数组<7, []>

// 相加即将两个数值转为数组，然后合并两个数组后返回length长度得到相加结果
type 相加<某数甲 extends number, 某数乙 extends number> = 得到长度<[...转数组<某数甲>, ...转数组<某数乙>]>;

// 定义一个函数类型，然后extends右边的对数组进行解构
// 解构后...剩下的数组通过infer返回出来，实现减一的效果
type 数组减一<某数组类型 extends any[]> = ((
    ...参数: 某数组类型
) => any) extends (拆一个元素: any, ...剩下的数组: infer 剩下的数组类型) => any
    ? 剩下的数组类型
    : [];

type arr1 = 数组减一<[1, 2, 3, 4, 5, 6, 7, 8]>

// 减一就是在转数组，数组减一，得到长度组装得到的效果
type 减一<某数 extends number> = 得到长度<数组减一<转数组<某数>>>;

type 斐波那契八 = 斐波那契<8>
