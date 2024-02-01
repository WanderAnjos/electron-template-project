import path from 'node:path'

import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import type { Configuration } from 'webpack'

import { rules } from './rules.config'

const mainConfig: Configuration = {
  entry: './src/main/index.ts',
  module: {
    rules,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ],
  },
}

export default mainConfig
