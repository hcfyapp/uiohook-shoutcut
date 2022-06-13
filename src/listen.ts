import { shortcuts } from './shortcuts'
import { uIOhook } from 'uiohook-napi'
import { isAcceleratorEqual } from './map'

const pressed: number[] = []

uIOhook.on('keydown', (e) => {
  const keycode = e.keycode
  if (pressed.includes(keycode)) return
  pressed.push(keycode)
  for (const kv of shortcuts) {
    const accelerator = kv[0]
    const callback = kv[1]
    if (isAcceleratorEqual(pressed, accelerator)) {
      callback()
      break
    }
  }
})
uIOhook.on('keyup', (e) => {
  const i = pressed.indexOf(e.keycode)
  if (i >= 0) {
    pressed.splice(i, 1)
  }
})
uIOhook.start()
