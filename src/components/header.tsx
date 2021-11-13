import * as React from "react";
import { Link, useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from "gatsby-plugin-image";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

const iconProps = {
  color: 'black',
  width: 28,
  height: 28
};

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

const IconLink = styled(Link)`
  padding-right: 8px;
`;

export const Header: React.FC = () => {
  const data = useStaticQuery<GatsbyTypes.MyQueryQuery>(graphql`
    query MyQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const blogTitle = data.site?.siteMetadata?.title || `TerribleI2's Blog`;
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
        <IconLink to='https://github.com/terriblei2'>
          <FontAwesomeIcon icon={faGithub} {...iconProps} />
        </IconLink>
        <IconLink to='https://twitter.com/terribleI2'>
          <FontAwesomeIcon icon={faTwitter} {...iconProps} />
        </IconLink>
      </OtherAccountIconWrap>
    </Root>
  );
};