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

const letterSpacing = {
  basic: "-0.03rem",
}

export const headline = {
  headline: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.bold};
    font-size: 36px;
  `,
}

export const title = {
  title1: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.semiBold};
    letter-spacing: ${letterSpacing.basic};
    font-size: 32px;
  `,
  title2: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.semiBold};
    letter-spacing: ${letterSpacing.basic};
    font-size: 20px;
  `,
}

export const body = {
  body1: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.regular};
    letter-spacing: ${letterSpacing.basic};
    font-size: 20px;
  `,
  body2: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.regular};
    letter-spacing: ${letterSpacing.basic};
    font-size: 18px;
  `,
  body3: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.regular};
    letter-spacing: ${letterSpacing.basic};
    font-size: 16px;
  `,
}

export const caption = {
  caption1: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.semiBold};
    letter-spacing: ${letterSpacing.basic};
    font-size: 14px;
  `,
  caption2: css`
    font-family: ${fontFamily.pretendard};
    font-weight: ${fontWeight.regular};
    letter-spacing: ${letterSpacing.basic};
    font-size: 14px;
  `,
}

const Typography = {
  ...headline,
  ...title,
  ...body,
  ...caption,
}

export default Typography
