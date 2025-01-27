import { css } from "styled-components"

const fontFamily = {
  pretendard: `Pretendard, NanumSquare, '맑은 고딕', 'Malgun Gothic', 'Apple SD Gothic Neo', 'sans-serif'`,
}

const fontWeight = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  heavy: 900,
}

export const headline = {
  headline: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.bold};
  `,
}

export const title = {
  title: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.bold};
  `,
}

export const body = {
  body: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.regular};
    font-size: 16px;
  `,
}

const Typography = {
  ...headline,
  ...title,
  ...body,
}

export default Typography
