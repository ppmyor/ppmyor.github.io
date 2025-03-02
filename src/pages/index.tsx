import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
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
          category: any
          featuredImage: any
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
              <StyledCategory>{frontmatter.category}</StyledCategory>
              <StyledContentItem>
                <GatsbyImage
                  image={getImage(frontmatter.featuredImage)}
                  alt={frontmatter.title}
                  style={{
                    border: "1px solid #bbb",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                />
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

const StyledContentsWrapper = styled.article``

const StyledContents = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 44px;
  & > a {
    text-decoration: none;
  }
`

const StyledCategory = styled.mark`
  padding: 6px 10px;
  border-radius: 18px;
  background-color: ${Colors.pointSecondary};
  color: ${Colors.gray900};
  ${Typography.label1}
`

const StyledContentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 16px;
`

const StyledContentTitle = styled.h3`
  margin: 0;
  color: ${Colors.gray300};
  ${Typography.title1};
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
          category
          featuredImage {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
