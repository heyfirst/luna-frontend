import React from 'react'

module.exports = {
  // Extract the styles into the page meta
  App: (Comp, { meta }) => {
    const sheet = new ServerStyleSheet()
    const CollectedApp = sheet.collectStyles(<Comp />)
    meta.styledComponentsTags = sheet.getStyleElement()
    return CollectedApp
  },
  // Place the styles into the HEad
  Head: ({ meta }) => <React.Fragment>{meta.styledComponentsTags}</React.Fragment>,
}
