type If<C extends boolean, T, F> = C extends true ? T : F

type a268 = If<true, 'a', 'b'>