import React from 'react'
import { createRoot, Root } from 'react-dom/client'

import { App } from './App'
const nodeDom = document.getElementById('root')
let root: Root

if (nodeDom != null) {
  root = createRoot(nodeDom)

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
