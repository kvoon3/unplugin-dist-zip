/* eslint-disable no-console */
import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import fs from 'node:fs'
import path from 'node:path'
import JSZip from 'jszip'
import { createUnplugin } from 'unplugin'
import { name } from '../package.json'

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
  name,
  enforce: 'post',
  vite: {
    closeBundle() {
      console.log(`[${name}]: Start create zip file...`)

      const {
        input = 'dist',
        output = 'pkg',
        filename = 'dist',
      } = options || {}

      const zip = new JSZip()

      function addFolderToZip(folderPath: string, zip: JSZip): void {
        const files = fs.readdirSync(folderPath)

        for (const file of files) {
          const filePath = path.join(folderPath, file)
          console.log('filePath', filePath)
          const stats = fs.statSync(filePath)

          if (stats.isFile()) {
            const fileContent = fs.readFileSync(filePath)
            const relativePath = path.relative(folderPath, filePath)
            zip.file(relativePath, fileContent)
          }
          else if (stats.isDirectory()) {
            const subFolder = zip.folder(path.relative(input, filePath))
            if (subFolder) {
              addFolderToZip(filePath, subFolder)
            }
          }
        }
      }

      addFolderToZip(input, zip)

      zip.generateAsync({ type: 'nodebuffer' })
        .then((content) => {
          if (!fs.existsSync(output)) {
            fs.mkdirSync(output, { recursive: true })
          }

          const name = typeof filename === 'function'
            ? filename()
            : filename

          const outputFilePath = path.join(output, `${name}.zip`)

          fs.writeFileSync(outputFilePath, content)

          console.log(`Zip file created successfully: ${outputFilePath}`)
        })
        .catch((error) => {
          console.error('Error creating zip file:', error)
        })
    },
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
