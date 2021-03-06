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
  commandorcontrol: isMacOS ? Meta : Ctrl,
  alt: Alt,
  option: isMacOS ? Alt : null,
  get altgr(): never {
    throw new Error('libUIOHook doesn\'t support "AltGr" key.')
  },
  shift: Shift,
  meta: Meta,
  '0': UiohookKey['0'],
  '1': UiohookKey['1'],
  '2': UiohookKey['2'],
  '3': UiohookKey['3'],
  '4': UiohookKey['4'],
  '5': UiohookKey['5'],
  '6': UiohookKey['6'],
  '7': UiohookKey['7'],
  '8': UiohookKey['8'],
  '9': UiohookKey['9'],
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
  up: UiohookKey.ArrowUp,
  down: UiohookKey.ArrowDown,
  left: UiohookKey.ArrowLeft,
  right: UiohookKey.ArrowRight,
  home: UiohookKey.Home,
  end: UiohookKey.End,
  pageup: UiohookKey.PageUp,
  pagedown: UiohookKey.PageDown,
  escape: UiohookKey.Escape,
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
 * ??? Electron ??? accelerator ?????? libUIOHook ?????? key code
 * @param accelerator https://www.electronjs.org/docs/latest/api/accelerator
 * @returns ?????? key code ?????????????????? null???????????? accelerator ?????????????????????????????????????????????????????? Windows ???????????????????????? macOS ????????? Option ??????
 * @throws ?????? accelerator ????????? Electron ??????????????????????????????
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
 * ?????? libUIOHook ??? code ????????????????????? accelerator
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
