import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default {
  disableRouteInfoWarning: true,
  getSiteData: () => ({
    title: 'Luna.'
  }),
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Luna.Codes</title>
            <link
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
              crossOrigin="anonymous"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Kanit:300,400,700"
              rel="stylesheet"
            />
            {renderMeta.styleTags}
          </Head>
          <Body>
            {children}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.fbAsyncInit = function() {
                  FB.init({
                    appId      : '550462162042751',
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v3.1'
                  });

                  FB.AppEvents.logPageView();
                };

                (function(d, s, id){
                   var js, fjs = d.getElementsByTagName(s)[0];
                   if (d.getElementById(id)) {return;}
                   js = d.createElement(s); js.id = id;
                   js.src = "https://connect.facebook.net/en_US/sdk.js";
                   fjs.parentNode.insertBefore(js, fjs);
                 }(document, 'script', 'facebook-jssdk'));
              `
              }}
            />

            {/* <script
              src="https://cdn.ravenjs.com/3.26.4/raven.min.js"
              crossOrigin="anonymous"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                Raven.config('https://7a8d4d33f145426d9eb80b930ac0ea8e@sentry.io/1264885').install()
              `
              }}
            />
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-82920412-5"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || []; function gtag()
              {dataLayer.push(arguments)}
              gtag('js', new Date()); gtag('config', 'UA-82920412-5');
              `
              }}
            /> */}
          </Body>
        </Html>
      )
    }
  }
}
