import React from "react";
import { Link, PageProps } from "gatsby";
import styled from 'styled-components';
import { config } from '@fortawesome/fontawesome-svg-core';

import { Header } from './header';

const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Yu Gothic", YuGothic, Verdana, Meiryo, "M+ 1p", sans-serif;';

const Root = styled.div`
  margin: 0 40px;
  font-family: ${FONT_FAMILY};
`;

const StyledMain = styled.main`
  margin: 20px 0;
`;

interface Props {
  title: string;
  location: PageProps['location'];
}

const Layout: React.FC<Props> = ({ location, title, children }) => {
  config.autoAddCss = false;
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  // const header = isRootPath ? (
  //   <Header>{title}</Header>
  // ) : (
  //   <Header>{title}</Header>
  // );
  // const header = isRootPath ? (
  //   <h1 className="main-heading">
  //     <Link to="/">{title}</Link>
  //   </h1>
  // ) : (
  //   <Link className="header-link-home" to="/">
  //     {title}
  //   </Link>
  // );

  return (
    <Root data-is-root-path={isRootPath}>
      {/* <header className="global-header">{header}</header> */}
      <Header />
      <StyledMain>{children}</StyledMain>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </Root>
  );
};

export default Layout;
