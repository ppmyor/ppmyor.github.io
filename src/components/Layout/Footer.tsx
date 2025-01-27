import React from "react"
import styled from "styled-components"
import Colors from "@/layout/color"
import Typography from "@/layout/typography"

export default function Footer() {
  return (
    <StyledFooter>
      <StyledFooterContents>
        <a href="https://github.com/ppmyor" target="_blank">
          🌱 Github 🌱
        </a>
      </StyledFooterContents>
      <StyledFooterContents>
        <span>✉️ Contact Me ✉️</span>
        <a href="mailto:annaing.dev@gmail.com">annaing.dev@gmail.com</a>
      </StyledFooterContents>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px 16px;
  background-color: ${Colors.pointTertiary};
  ${Typography.caption1}
`

const StyledFooterContents = styled.div`
  display: flex;
  gap: 16px;
  color: ${Colors.pointPrimary};
  & > a {
    color: inherit;
    text-decoration: none;
  }
`
