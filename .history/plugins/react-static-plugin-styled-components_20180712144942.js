import React from 'react'
import { ServerStyleSheet } from 'styled-components'

module.exports = {
  // Extract the styles into the page meta
  beforeRenderToHtml: (app, { meta }) => {
      meta.styleComponentsSheet = new ServerStyleSheet()
    const collectedApp = meta.styleComponentsSheet.collectStyles(app)
    return collectedApp
  },
  beforeHtmlToDocument: (html, {meta}) => {
    meta.styledComponentsTags = meta.sheet.getStyleElement()
  }
  // Place the styles into the HEad
  Head: ({ meta }) => <React.Fragment>{meta.styledComponentsTags}</React.Fragment>,
}
