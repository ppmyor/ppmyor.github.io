import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import Typography from "@/layout/typography"
import Colors from "@/layout/color"
import Layout from "@/components/Layout/Layout"

interface Props {
  data: {
    allMarkdownRemark: {
      nodes: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string | null
          date: string | null
          description: string | null
        }
      }[]
    }
  }
}

export default function BlogIndexPage({ data }: Props) {
  return (
    <Layout>
      <StyledContentsWrapper>
        <StyledContents>
          {data.allMarkdownRemark.nodes.map(({ fields, frontmatter }) => (
            <Link key={fields.slug} to={fields.slug}>
              <StyledContentItem>
                <StyledContentTitle>{frontmatter.title}</StyledContentTitle>
                <StyledContentCreateAt>
                  {frontmatter.date}
                </StyledContentCreateAt>
                <StyledContentDescription>
                  {frontmatter.description}
                </StyledContentDescription>
              </StyledContentItem>
            </Link>
          ))}
        </StyledContents>
      </StyledContentsWrapper>
    </Layout>
  )
}

const StyledContentsWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`

const StyledContents = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 44px;
`

const StyledContentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const StyledContentTitle = styled.h3`
  ${Typography.title1}
`

const StyledContentCreateAt = styled.span`
  color: ${Colors.gray500};
  ${Typography.caption2}
`

const StyledContentDescription = styled.p`
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  color: ${Colors.gray300};
  ${Typography.body3}
`

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: [{ frontmatter: { date: DESC } }]) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date
          description
        }
      }
    }
  }
`
