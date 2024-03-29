import MakerDeb from '@electron-forge/maker-deb'
import MakerRpm from '@electron-forge/maker-rpm'
import MakerSquirrel from '@electron-forge/maker-squirrel'
import MakerZIP from '@electron-forge/maker-zip'
import WebpackPlugin from '@electron-forge/plugin-webpack'
import type { ForgeConfig } from '@electron-forge/shared-types'

import mainConfig from './webpack/main.config'
import rendererConfig from './webpack/renderer.config'

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: "connect-src 'self' * 'unsafe-eval'",
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/renderer/index.html',
            js: './src/renderer/index.tsx',
            name: 'main_window',
            preload: {
              js: './src/preload/index.ts',
            },
          },
        ],
      },
    }),
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
}

export default config
