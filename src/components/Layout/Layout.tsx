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
        <StyledContents>{children}</StyledContents>
        <Footer />
      </main>
    </StyledLayoutWrapper>
  )
}

const StyledLayoutWrapper = styled.div`
  height: 100vh;
`

const StyledContents = styled.div`
  padding: 62px 0;
`
