import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import DistZip from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    DistZip({
      filename() {
        const date = new Date()

        const formattedDate = date.getFullYear().toString()
          + (date.getMonth() + 1).toString().padStart(2, '0')
          + date.getDate().toString().padStart(2, '0')
          + date.getHours().toString().padStart(2, '0')
          + date.getMinutes().toString().padStart(2, '0')
          + date.getSeconds().toString().padStart(2, '0')

        return `playground_${formattedDate}`
      },
    }),
  ],
})
