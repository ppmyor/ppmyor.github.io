import React from "react"

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Pretendard-Bold.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
      key="pretendardBold"
    />,
    <link
      rel="preload"
      href="/fonts/Pretendard-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="pretendardBold2"
    />,
    <link
      rel="preload"
      href="/fonts/Pretendard-Regular.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
      key="pretendardRegular"
    />,
    <link
      rel="preload"
      href="/fonts/Pretendard-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="pretendardRegular2"
    />,
  ])
}
