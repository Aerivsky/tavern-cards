export const Schema = z.object({
  世界: z.object({
    当前所在小世界: z.string().prefault('扶摇界'),
    当前场景: z.string().prefault(''),
    行商阶段: z.enum(['交涉通行证', '融入', '行商', '离场', '非法闯入']).prefault('交涉通行证'),
    通行证状态: z.enum(['合法', '弱化', '将尽', '无']).prefault('无'),
  }).prefault({}),
  藏锋: z.object({
    当前面孔: z.enum(['对外', '对内', '独处']).prefault('对外'),
    气运档位: z.enum(['充足', '紧张', '枯竭']).prefault('充足'),
    当前临时身份: z.string().prefault(''),
    当前着装: z.string().prefault(''),
  }).prefault({}),
  世界足迹: z.record(
    z.string().describe('小世界名'),
    z.object({
      声望: z.string().prefault(''),
    }).prefault({})
  ).prefault({}),
});
export type Schema = z.output<typeof Schema>;
