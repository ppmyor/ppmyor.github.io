import * as React from "react"
import { graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Typography from "@/layout/typography"
import Colors from "@/layout/color"
import Layout from "@/components/Layout/Layout"
import Seo from "../components/seo"

export default function BlogPostTemplate({ data: { markdownRemark: post } }) {
  const thumbnailImage = getImage(post.frontmatter.featuredImage)
  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Layout>
        {post.frontmatter.category && (
          <StyledCategory>{post.frontmatter.category}</StyledCategory>
        )}
        <StyledImageWrapper>
          {thumbnailImage && (
            <GatsbyImage
              image={thumbnailImage}
              alt={post.frontmatter.title}
              style={{
                width: "100%",
              }}
            />
          )}
        </StyledImageWrapper>
        <StyledTitle>{post.frontmatter.title}</StyledTitle>
        <StyledSubTitle>{post.frontmatter.description}</StyledSubTitle>
        <StyledCreateAt>{post.frontmatter.date}</StyledCreateAt>
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          {post.frontmatter.tags && (
            <StyledTagWrapper>
              {post.frontmatter.tags.map(tag => (
                <StyledTag key={tag}>{`# ${tag}`}</StyledTag>
              ))}
            </StyledTagWrapper>
          )}
        </article>
      </Layout>
    </>
  )
}

const StyledCategory = styled.mark`
  padding: 6px 10px;
  border-radius: 18px;
  background-color: ${Colors.pointSecondary};
  color: ${Colors.gray900};
  ${Typography.label1}
`

const StyledImageWrapper = styled.div`
  margin: 36px 0;
`

const StyledTitle = styled.h1`
  margin: 8px 0;
  padding: 0;
`

const StyledSubTitle = styled.p`
  margin-bottom: 6px;
  ${Typography.title2}
`

const StyledCreateAt = styled.span`
  color: ${Colors.gray600};
  ${Typography.caption1};
`

const StyledTagWrapper = styled.div`
  display: flex;
  gap: 12px;
`

const StyledTag = styled.span`
  background-color: ${Colors.gray900};
  color: ${Colors.pointSecondary};
  ${Typography.caption1}
`

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        category
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        title
        description
        date(formatString: "yyyy.MM.DD")
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
