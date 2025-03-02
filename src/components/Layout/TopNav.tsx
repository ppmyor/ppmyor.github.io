import React from "react"
import styled from "styled-components"
import { CATEGORIES } from "@/constants/categories"
import Typography from "@/layout/typography"
import Colors from "@/layout/color"

// TODO: 각 카테고리별 페이지 구현 필요
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
  margin: 0;
`

const StyledCategory = styled.li`
  list-style-type: none;
  color: ${Colors.gray300};
  margin: 0;
  ${Typography.title2}
  & > a {
    color: inherit;
    text-decoration: none;
  }
  &:hover {
    color: ${Colors.pointSecondary};
  }
`
