import { shortcuts } from './shortcuts'
import { convertAccelerator } from './map'
import { normalizeAccelerator } from './normalize'

const noop = () => {}

export function register(accelerator: string, callback: () => void) {
  const codes = convertAccelerator(accelerator)
  shortcuts.set(normalizeAccelerator(accelerator), codes ? callback : noop)
  return true
}

export function registerAll(accelerators: string[], callback: () => void) {
  accelerators.forEach((accelerator) => {
    register(accelerator, callback)
  })
}

export function isRegistered(accelerator: string) {
  return shortcuts.has(normalizeAccelerator(accelerator))
}

export function unregister(accelerator: string) {
  shortcuts.delete(normalizeAccelerator(accelerator))
}

export function unregisterAll() {
  shortcuts.clear()
}
