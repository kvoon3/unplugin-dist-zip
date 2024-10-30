# unplugin-dist-zip

[![NPM version](https://img.shields.io/npm/v/unplugin-dist-zip?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-dist-zip)

## Install

```bash
npm i -D unplugin-dist-zip
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import DistZip from 'unplugin-dist-zip/vite'

export default defineConfig({
  plugins: [
    DistZip(
      // Default Configs
      {
        input: 'dist',
        output: 'pkg',
        filename: 'dist',
      }
    ),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>
