import React from "react"
import styled from "styled-components"
import Header from "@/components/Layout/Header"
import TopNav from "@/components/Layout/TopNav"
import Footer from "@/components/Layout/Footer"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <StyledLayoutWrapper>
      <main>
        <Header />
        <TopNav />
        <StyledContentsWrapper>
          <StyledContents>{children}</StyledContents>
        </StyledContentsWrapper>
        <Footer />
      </main>
    </StyledLayoutWrapper>
  )
}

const StyledLayoutWrapper = styled.div``

const StyledContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 62px 0;
`

const StyledContents = styled.div`
  width: 50%;
`
