import {
  register,
  registerAll,
  isRegistered,
  unregister,
  unregisterAll,
} from '../src'
import { uIOhook, UiohookKey } from 'uiohook-napi'
const isMacOS = process.platform === 'darwin'
const cb = jest.fn()
const cb2 = jest.fn()

function triggerKey(keycode: number, auto = true) {
  uIOhook.emit('keydown', { keycode })
  const release = () => {
    uIOhook.emit('keyup', { keycode })
  }
  if (auto) {
    release()
    return () => {}
  }
  return release
}

function triggerKeys(keycodes: number[], auto = true) {
  keycodes.forEach((keycode) => {
    uIOhook.emit('keydown', { keycode })
  })

  const release = () => {
    keycodes.forEach((keycode) => {
      uIOhook.emit('keyup', { keycode })
    })
  }

  if (auto) {
    release()
    return () => {}
  }

  return release
}

afterEach(function () {
  unregisterAll()
})

test('如果注册 Electron 不支持的键会报错', () => {
  expect(() => {
    register('no_this_key', cb)
  }).toThrow('no_this_key is not a valid Electron accelerator.')
})

test('不支持 Electron 中的 AltGr 键', () => {
  expect(() => {
    register('AltGr+C', cb)
  }).toThrow('libUIOHook doesn\'t support "AltGr" key.')
})

test('不支持 Electron 中的 Plus 键', () => {
  expect(() => {
    register('Ctrl+Plus+C', cb)
  }).toThrow('libUIOHook doesn\'t support "Plus" key.')
})

describe.each<[string, () => void, number]>([
  [
    'CmdOrCtrl+C',
    () => {
      triggerKeys([isMacOS ? UiohookKey.Meta : UiohookKey.Ctrl, UiohookKey.C])
    },
    1,
  ],
  [
    // Cmd 只有 macOS 支持
    'Cmd+C',
    () => {
      triggerKeys([isMacOS ? UiohookKey.Meta : -1, UiohookKey.C])
    },
    isMacOS ? 1 : 0,
  ],
])('快捷键 %s', function (shortcut, trigger, expectCount) {
  describe('注册后', function () {
    beforeEach(function () {
      register(shortcut, cb)
      trigger()
    })

    test('能成功触发', () => {
      expect(cb).toHaveBeenCalledTimes(expectCount)
    })

    test('再取消注册则不会重新触发', () => {
      unregister(shortcut)
      trigger()
      expect(cb).toHaveBeenCalledTimes(expectCount)
    })

    test('用 unregisterAll 取消注册后也不会重新触发', () => {
      unregisterAll()
      trigger()
      expect(cb).toHaveBeenCalledTimes(expectCount)
    })

    test('isRegistered 会返回 true', () => {
      expect(isRegistered(shortcut)).toBe(true)
    })
  })
})

test('多次触发 keydown 事件时不会导致 callback 被重复执行', () => {
  register('CmdOrCtrl+C', cb)
  const reM = triggerKey(isMacOS ? UiohookKey.Meta : UiohookKey.Ctrl, false)
  triggerKey(UiohookKey.C, false)
  triggerKey(UiohookKey.C, false)
  triggerKey(UiohookKey.C, false)
  triggerKey(UiohookKey.C, false)
  const reC = triggerKey(UiohookKey.C, false)
  expect(cb).toHaveBeenCalledTimes(1)
  reM()
  reC()
})

test('registerAll 能为多个快捷键注册同一个 callback', () => {
  registerAll(['A', 'B'], cb)
  triggerKey(UiohookKey.A)
  triggerKey(UiohookKey.B)
  expect(cb).toHaveBeenCalledTimes(2)
})

describe('短写的快捷键会被视为同一个', function () {
  test('触发快捷键时，只会触发最后注册的 callback', () => {
    register('CommandOrControl+C', cb)
    register('CmdOrCtrl+C', cb2)
    triggerKeys([isMacOS ? UiohookKey.Meta : UiohookKey.Ctrl, UiohookKey.C])
    expect(cb).toHaveBeenCalledTimes(0)
    expect(cb2).toHaveBeenCalledTimes(1)
  })

  test('注册其中一个时，另一个也会被认为是已注册', () => {
    register('CommandOrControl+C', cb)
    expect(isRegistered('CmdOrCtrl+C')).toBe(true)
  })

  test('取消注册其中一个时，另一个也会被认为取消了', () => {
    register('CommandOrControl+C', cb)
    unregister('CmdOrCtrl+C')
    expect(isRegistered('CommandOrControl+C')).toBe(false)
  })
})
