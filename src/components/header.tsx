import * as React from "react";
import { Link, useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image";
import styled from 'styled-components';

// import GitHubBrands from '../images/github-brands.svg';
// import TwitterBrands from '../images/twitter-square-brands.svg';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`;

const TitleWrap = styled.div`
  display: flex;
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  font-size: 28px;
  text-decoration: none;
  cursor: pointer;
`;

const OtherAccountIconWrap = styled.div`
  display: flex;

`;

const OtherAccountIcon = styled.img`
  border-radius: 8px;
  height: 28px;
  width: 28px;
`;

export const Header: React.FC = () => {
  const data = useStaticQuery<GatsbyTypes.MyQueryQuery>(graphql`
    query MyQuery {
      allFile {
        nodes {
          name
          publicURL
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const blogTitle = data.site?.siteMetadata?.title || `TerribleI2's Blog`;
  const githubBrands = data.allFile?.nodes.find(({name}) => name === 'github-brands');
  const twitterSquareBrands = data.allFile?.nodes.find(({name}) => name === 'twitter-square-brands');
  return (
    <Root>
      <TitleWrap>
        <StaticImage
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={36}
          height={36}
          quality={95}
          alt="ブロガーアイコン"
        />
        <StyledLink to='/'>
          {blogTitle}
        </StyledLink>
      </TitleWrap>
      <OtherAccountIconWrap>
        <Link to='https://github.com/terriblei2'>
          <OtherAccountIcon src={githubBrands?.publicURL} alt='githubアイコン' />
        </Link>
        <Link to='https://twitter.com/terribleI2'>
          <OtherAccountIcon src={twitterSquareBrands?.publicURL} alt='twitterアイコン' />
        </Link>
      </OtherAccountIconWrap>
    </Root>
  );
};