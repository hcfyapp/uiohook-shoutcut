import { uIOhook } from 'uiohook-napi'
import { shortcuts } from './shortcuts'
import { isAcceleratorEqual } from './map'

const pressed: number[] = []

uIOhook.on('keydown', ({ keycode }) => {
  if (pressed.includes(keycode)) return
  pressed.push(keycode)
  for (const [accelerator, callback] of shortcuts) {
    if (isAcceleratorEqual(pressed, accelerator)) {
      callback()
      break
    }
  }
})

uIOhook.on('keyup', ({ keycode }) => {
  const i = pressed.indexOf(keycode)
  if (i >= 0) {
    pressed.splice(i, 1)
  }
})

uIOhook.start()
