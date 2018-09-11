import React from 'react'
import { ServerStyleSheet } from 'styled-components'

module.exports = {
  // Use beforeRenderToHtml to extract the styles into the page meta
  beforeRenderToHtml: (app, { meta }) => {
    meta.styleComponentsSheet = new ServerStyleSheet()
    return meta.styleComponentsSheet.collectStyles(app)
  },
  Head: ({ meta }) => (
    // The styles aren't fully extraced until the react component
    // has been rendered to an html string. So we wait until the head
    // to call the sheet's getStyleElement function
    // and then insert the tag into the Head
    <React.Fragment>{meta.styleComponentsSheet.getStyleElement()}</React.Fragment>
  ),
}
