import React from "react"
import styled from "styled-components"
import Typography from "@/layout/typography"
import Colors from "@/layout/color"

export default function Header() {
  return (
    <StyledHeader>
      <a href="/">이렇게 삽질하다간 지구 끝까지 닿겠어</a>
    </StyledHeader>
  )
}

const StyledHeader = styled.h1`
  padding: 32px;
  margin: 0;
  color: ${Colors.pointPrimary};
  ${Typography.headline};
`
