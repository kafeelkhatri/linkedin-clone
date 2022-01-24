import { connect } from "react-redux";
import styled from "styled-components";
import { signOut, signOutAPI } from "../actions";

function Header(props) {
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img alt="" src="/images/linkedin.png" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img alt="" src="/images/search-icon.svg" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a>
                <img alt="" src="/images/nav-home.svg" />
                <span>Home</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img alt="" src="/images/nav-network.svg" />
                <span>My Network</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img alt="" src="/images/nav-jobs.svg" />
                <span>Jobs</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img alt="" src="/images/nav-messaging.svg" />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img alt="" src="/images/nav-notifications.svg" />
                <span>Notifications</span>
              </a>
            </NavList>
            <User>
              <a>
                {props.user && props.user.photoURL ? (
                  <img alt="" src={props.user.photoURL} />
                ) : (
                  <img alt="" src="/images/user.svg" />
                )}
                <span>
                  Me
                  <img alt="" src="/images/down-icon.svg" />
                </span>
              </a>
              <SignOut onClick={() => props.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>
            <Work>
              <a>
                <img alt="" src="/images/nav-work.svg" />
                <span>
                  Work
                  <img alt="" src="/images/down-icon.svg" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgb(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  img {
    width: 40px;
  }
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgb(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-evenly;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid #fff;
      bottom: 0;
      left: 0;
      position: absolute;
      transition: trasnform 0.2s ease-in-out;
      width: 100%;
      border-color: rgb(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;

    span {
      color: rgb(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      min-width: 70px;
    }
  }

  &:hover,
  &:active {
    a {
      span {
        color: rgb(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
  cursor: pointer;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
`;

const User = styled(NavList)`
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;
const Work = styled(User)`
  border-left: 1px solid rgb(0, 0, 0, 0.08);
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
