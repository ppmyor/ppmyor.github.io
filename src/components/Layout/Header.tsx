import React from "react"
import styled from "styled-components"
import Typography from "@/layout/typography"
import Colors from "@/layout/color"

export default function Header() {
  return (
    <StyledHeader>
      <a href="/">개발새발</a>
    </StyledHeader>
  )
}

const StyledHeader = styled.h1`
  padding: 32px;
  color: ${Colors.pointPrimary};
  ${Typography.headline};
`
