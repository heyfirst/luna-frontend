import React from 'react'
import { ServerStyleSheet } from 'styled-components'

module.exports = {
  default: {
    // Extract the styles into the page meta
    AppRendered: (app, { meta }) => {
      const sheet = new ServerStyleSheet()
      const CollectedApp = sheet.collectStyles(app)
      meta.styledComponentsTags = sheet.getStyleElement()
      return CollectedApp
    },
    // Place the styles into the HEad
    Head: ({ meta }) => <React.Fragment>{meta.styledComponentsTags}</React.Fragment>,
  },
}
