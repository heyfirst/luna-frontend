import React from 'react'
import { ServerStyleSheet } from 'styled-components'

module.exports = {
  // Extract the styles into the page meta
  beforeRenderToHtml: (app, { meta }) => {
    const sheet = new ServerStyleSheet()
    const collected = sheet.collectStyles(app)
    meta.styledComponentsTags = sheet.getStyleElement()
    return collected
  },
  // Place the styles into the HEad
  Head: ({ meta }) => <React.Fragment>{meta.styledComponentsTags}</React.Fragment>,
}
