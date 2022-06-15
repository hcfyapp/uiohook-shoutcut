import { UiohookKey } from 'uiohook-napi'
import { normalizeKey } from './normalize'

const isMacOS = process.platform === 'darwin'

const Meta = [UiohookKey.Meta, UiohookKey.MetaRight]
const Ctrl = [UiohookKey.Ctrl, UiohookKey.CtrlRight]
const Alt = [UiohookKey.Alt, UiohookKey.AltRight]
const Shift = [UiohookKey.Shift, UiohookKey.ShiftRight]

const KeyMap: Record<string, number | number[] | null | undefined> = {
  command: isMacOS ? Meta : null,
  control: Ctrl,
  ctrl: Ctrl,
  commandorcontrol: isMacOS ? Meta : Ctrl,
  alt: Alt,
  option: isMacOS ? Alt : null,
  get altgr(): never {
    throw new Error('libUIOHook doesn\'t support "AltGr" key.')
  },
  shift: Shift,
  super: Meta,
  meta: Meta,
  '0': UiohookKey['0'],
  '1': UiohookKey['0'],
  '2': UiohookKey['0'],
  '3': UiohookKey['0'],
  '4': UiohookKey['0'],
  '5': UiohookKey['0'],
  '6': UiohookKey['0'],
  '7': UiohookKey['0'],
  '8': UiohookKey['0'],
  '9': UiohookKey['0'],
  a: UiohookKey.A,
  b: UiohookKey.B,
  c: UiohookKey.C,
  d: UiohookKey.D,
  e: UiohookKey.E,
  f: UiohookKey.F,
  g: UiohookKey.G,
  h: UiohookKey.H,
  i: UiohookKey.I,
  j: UiohookKey.J,
  k: UiohookKey.K,
  l: UiohookKey.L,
  m: UiohookKey.M,
  n: UiohookKey.N,
  o: UiohookKey.O,
  p: UiohookKey.P,
  q: UiohookKey.Q,
  r: UiohookKey.R,
  s: UiohookKey.S,
  t: UiohookKey.T,
  u: UiohookKey.U,
  v: UiohookKey.V,
  w: UiohookKey.W,
  x: UiohookKey.X,
  y: UiohookKey.Y,
  z: UiohookKey.Z,
  f1: UiohookKey.F1,
  f2: UiohookKey.F2,
  f3: UiohookKey.F3,
  f4: UiohookKey.F4,
  f5: UiohookKey.F5,
  f6: UiohookKey.F6,
  f7: UiohookKey.F7,
  f8: UiohookKey.F8,
  f9: UiohookKey.F9,
  f10: UiohookKey.F10,
  f11: UiohookKey.F11,
  f12: UiohookKey.F12,
  f13: UiohookKey.F13,
  f14: UiohookKey.F14,
  f15: UiohookKey.F15,
  f16: UiohookKey.F16,
  f17: UiohookKey.F17,
  f18: UiohookKey.F18,
  f19: UiohookKey.F19,
  f20: UiohookKey.F20,
  f21: UiohookKey.F21,
  f22: UiohookKey.F22,
  f23: UiohookKey.F23,
  f24: UiohookKey.F24,
  '`': UiohookKey.Backquote,
  '-': UiohookKey.Minus,
  '=': UiohookKey.Equal,
  '[': UiohookKey.BracketLeft,
  ']': UiohookKey.BracketRight,
  '\\': UiohookKey.Backslash,
  ';': UiohookKey.Semicolon,
  "'": UiohookKey.Quote,
  ',': UiohookKey.Comma,
  '.': UiohookKey.Period,
  '/': UiohookKey.Slash,
  get plus(): never {
    throw new Error('libUIOHook doesn\'t support "Plus" key.')
  },
  space: UiohookKey.Space,
  tab: UiohookKey.Tab,
  capslock: UiohookKey.CapsLock,
  // https://github.com/kwhat/libuiohook/blob/1.2.2/include/uiohook.h#L255
  numlock: 0x0045,
  // https://github.com/kwhat/libuiohook/blob/1.2.2/include/uiohook.h#L230
  scrolllock: 0x0046,
  backspace: UiohookKey.Backspace,
  delete: UiohookKey.Delete,
  insert: UiohookKey.Insert,
  return: UiohookKey.Enter,
  enter: UiohookKey.Enter,
  up: UiohookKey.ArrowUp,
  down: UiohookKey.ArrowDown,
  left: UiohookKey.ArrowLeft,
  right: UiohookKey.ArrowRight,
  home: UiohookKey.Home,
  end: UiohookKey.End,
  pageup: UiohookKey.PageUp,
  pagedown: UiohookKey.PageDown,
  escape: UiohookKey.Escape,
  esc: UiohookKey.Escape,
  // https://github.com/kwhat/libuiohook/blob/1.2.2/include/uiohook.h#L314-L316
  volumeup: 0xe030,
  volumedown: 0xe02e,
  volumemute: 0xe020,
  // https://github.com/kwhat/libuiohook/blob/1.2.2/include/uiohook.h#L307-L310
  medianexttrack: 0xe019,
  mediaprevioustrack: 0xe010,
  mediastop: 0xe024,
  mediaplaypause: 0xe022,
  // https://github.com/kwhat/libuiohook/blob/1.2.2/include/uiohook.h#L229
  printscreen: 0x0e37,
  num0: UiohookKey.Numpad0,
  num1: UiohookKey.Numpad1,
  num2: UiohookKey.Numpad2,
  num3: UiohookKey.Numpad3,
  num4: UiohookKey.Numpad4,
  num5: UiohookKey.Numpad5,
  num6: UiohookKey.Numpad6,
  num7: UiohookKey.Numpad7,
  num8: UiohookKey.Numpad8,
  num9: UiohookKey.Numpad9,
  numdec: UiohookKey.NumpadDecimal,
  numadd: UiohookKey.NumpadAdd,
  numsub: UiohookKey.NumpadSubtract,
  nummult: UiohookKey.NumpadMultiply,
  numdiv: UiohookKey.NumpadDivide,
}

/**
 * 将 Electron 的 accelerator 转为 libUIOHook 中的 key code
 * @param accelerator https://www.electronjs.org/docs/latest/api/accelerator
 * @returns 一个 key code 列表。如果是 null，则表示 accelerator 中包含当前操作系统不支持的键，比如在 Windows 系统中使用了只有 macOS 支持的 Option 键。
 * @throws 如果 accelerator 中包含 Electron 不支持的键则会抛错。
 */
export function convertAccelerator(accelerator: string) {
  const codes = accelerator.split('+').map((key) => {
    const code = KeyMap[normalizeKey(key)]
    if (code === undefined) {
      throw new Error(`${key} is not a valid Electron accelerator.`)
    }
    return code
  })
  if (codes.includes(null)) return null
  return codes as (number | number[])[]
}

/**
 * 判断 libUIOHook 的 code 数组是否等同于 accelerator
 * @param keycodeList
 * @param accelerator
 */
export function isAcceleratorEqual(keycodeList: number[], accelerator: string) {
  const codes = convertAccelerator(accelerator)
  if (!codes) return false
  if (codes.length !== keycodeList.length) return false
  return codes.every((code, index) => {
    const keycode = keycodeList[index]
    return Array.isArray(code) ? code.includes(keycode) : code === keycode
  })
}
