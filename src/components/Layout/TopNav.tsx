import React from "react"
import styled from "styled-components"
import { CATEGORIES } from "@/constants/categories"
import Typography from "@/layout/typography"
import Colors from "@/layout/color"

export default function TopNav() {
  return (
    <StyledNavigation>
      <StyledCategoryWrapper>
        {CATEGORIES.map(({ to, label }) => (
          <StyledCategory key={to}>
            <a href={to}>{label}</a>
          </StyledCategory>
        ))}
      </StyledCategoryWrapper>
    </StyledNavigation>
  )
}

const StyledNavigation = styled.nav`
  border-top: 1px solid ${Colors.gray800};
  border-bottom: 1px solid ${Colors.gray800};
  padding: 16px 26px;
`

const StyledCategoryWrapper = styled.ul`
  display: flex;
  gap: 32px;
`

const StyledCategory = styled.li`
  ${Typography.title2}
  &:hover {
    color: ${Colors.pointSecondary};
  }
`
