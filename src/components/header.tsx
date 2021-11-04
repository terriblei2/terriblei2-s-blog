import * as React from "react";
import { Link } from 'gatsby';
import styled from 'styled-components';

import AuthorImage from '../images/profile-pic.png';
import GitHubBrands from '../images/github-brands.svg';
import TwitterBrands from '../images/twitter-square-brands.svg';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`;

const StyledLink = styled(Link)`
  font-size: 28px;
  text-decoration: none;
  cursor: pointer;
`;

const AuthorIcon = styled.img`
  border-radius: 8px;
  height: 36px;
  width: 36px;
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
  return (
    <Root>
      <div>
        <AuthorIcon src={AuthorImage} alt='ブロガーアイコン'/>
        <StyledLink to='/'>
          TerribleI2's Blog
        </StyledLink>
      </div>
      <OtherAccountIconWrap>
        <Link to='https://github.com/terriblei2'>
          <OtherAccountIcon src={GitHubBrands} alt='githubアイコン' />
        </Link>
        <Link to=''>
          <OtherAccountIcon src={TwitterBrands} alt='twitterアイコン' />
        </Link>
      </OtherAccountIconWrap>
    </Root>
  );
};