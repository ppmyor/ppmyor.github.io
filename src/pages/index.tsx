import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Layout from "@/components/Layout/Layout"

interface Props {
  data: {
    allMarkdownRemark: {
      nodes: {
        fields: {
          slug: string
        }
      }[]
    }
  }
}

export default function BlogIndexPage({ data }: Props) {
  return (
    <Layout>
      <StyledTest>
        {data.allMarkdownRemark.nodes.map(({ fields }) => (
          <div key={fields.slug}>{fields.slug}</div>
        ))}
      </StyledTest>
    </Layout>
  )
}

const StyledTest = styled.div`
  color: red;
`

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      nodes {
        fields {
          slug
        }
      }
    }
  }
`
