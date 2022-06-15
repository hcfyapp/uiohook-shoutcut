# UIOHook Shortcut

A [Electron's globalShortcut](https://www.electronjs.org/docs/latest/api/global-shortcut) replacement based on [uiohook-napi](https://github.com/SnosMe/uiohook-napi).

## Why?

Because [Electron's globalShortcut disables the default behavior](https://github.com/electron/electron/issues/1338#issuecomment-217363864).

## How to use

First, install it:

```bash
npm i @hcfy/uiohook-shoutcut
```

Then replace Electron's `gobalShortcut` to `@hcfy/uiohook-shoutcut`:

```js
import { globalShortcut } from 'electron'
// replace to
import * as globalShortcut from '@hcfy/uiohook-shoutcut'
```

Done.
