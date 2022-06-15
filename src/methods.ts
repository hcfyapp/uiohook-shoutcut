import { shortcuts } from './shortcuts'
import { convertAccelerator } from './map'

const noop = () => {}

export function register(accelerator: string, callback: () => void) {
  const codes = convertAccelerator(accelerator)
  shortcuts.set(accelerator.toLowerCase(), codes ? callback : noop)
  return true
}

export function registerAll(accelerators: string[], callback: () => void) {
  accelerators.forEach((accelerator) => {
    register(accelerator, callback)
  })
}

export function isRegistered(accelerator: string) {
  return shortcuts.has(accelerator.toLowerCase())
}

export function unregister(accelerator: string) {
  shortcuts.delete(accelerator.toLowerCase())
}

export function unregisterAll() {
  shortcuts.clear()
}
