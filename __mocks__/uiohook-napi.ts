import * as EventEmitter from 'node:events'

class FakeUIoHookNapi extends EventEmitter {
  start() {}
  stop() {}
}

export const uIOhook = new FakeUIoHookNapi()

export { UiohookKey } from 'uiohook-napi'
