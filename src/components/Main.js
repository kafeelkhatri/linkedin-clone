import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticlesAPI } from "../actions";
import PostModal from "./PostModal";

function Main(props) {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, [props.articles]);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
    }
  };

  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img alt="" src={props.user.photoURL} />
            ) : (
              <img alt="" src="/images/user.svg" />
            )}
            <button onClick={(e) => handleClick(e)}>Start a post</button>
          </div>
          <div>
            <button>
              <img alt="" src="/images/photo-icon.svg" />
              <span>Photo</span>
            </button>
            <button>
              <img alt="" src="/images/video-icon.svg" />
              <span>Video</span>
            </button>
            <button>
              <img alt="" src="/images/event-icon.svg" />
              <span>Event</span>
            </button>
            <button>
              <img alt="" src="/images/article-icon.svg" />
              <span>Write Article</span>
            </button>
          </div>
        </ShareBox>
        {props.articles.length === 0 ? (
          <p>There are no articles</p>
        ) : (
          <Content>
            {props.loading && <img src="/images/loader.svg" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img alt="" src={article.actor.image} />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <img alt="" src="/images/ellipsis.svg" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImage>
                    <a>
                      {!article.sharedImage && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImage && (
                          <img alt="" src={article.sharedImage} />
                        )
                      )}
                    </a>
                  </SharedImage>
                  <SocialCounts>
                    <li>
                      <button>
                        <img
                          alt=""
                          src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                        />
                        <img
                          alt=""
                          src="https://static-exp1.licdn.com/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
                        />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments}</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img alt="" src="/images/like.svg" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img alt="" src="/images/comment.svg" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img alt="" src="/images/share.svg" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img alt="" src="/images/send.svg" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
        )}
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
}

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgb(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgb(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: rgb(0, 0, 0, 0.8);
        }
        &:hover {
          background-color: rgb(0, 0, 0, 0.08);
          border-radius: 5px;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0px 16px;
  overflow: hidden;
  color: black;
  font-size: 14px;
  text-align: left;
`;
const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background-color: white;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    border: none;
    background-color: white;

    span {
      margin-left: 8px;
    }
    @media (min-width: 768px) {
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 38px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
