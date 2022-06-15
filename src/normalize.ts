const ShortMap: Record<string, string | undefined> = {
  cmd: 'command',
  cmdorctrl: 'commandorcontrol',
}

/**
 * 将键的短写法转为正常写法
 * @param key
 * @example normalizeKey('Cmd') === 'command'
 */
export function normalizeKey(key: string) {
  const nk = key.toLowerCase()
  return ShortMap[nk] || nk
}

/**
 * 将快捷键转为统一的格式
 * @param accelerator
 * @example normalizeAccelerator('Cmd+C') === 'command+c'
 */
export function normalizeAccelerator(accelerator: string) {
  return accelerator.split('+').map(normalizeKey).join('+')
}
