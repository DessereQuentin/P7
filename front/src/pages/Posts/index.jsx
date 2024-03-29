import Post from '../../components/Post'
import CreatePost from '../../components/CreatePost'
import { useFetch } from '../../utils/hooks'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import LogoImg from '../../assets/icon-left-font-monochrome-black.png'
import { Loader } from '../../utils/style/Atoms'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import './style.css'

const Body = styled.div`
  background-color: ${colors.secondaire};
  min-height:1000px;
`

const Details = styled.details`
  margin-left: 20px;
  list-style: none;
`
const Button = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  text-decoration: none;
`
const BouttonDeco = styled.button`
  font-size: 16px;
  background-color: ${colors.quaternaire};
  color: black;
  border-color: aquamarine;
  width: 120px;
  margin: 5px;
  padding: 10px;
  border-radius: 30px 30px 30px 30px;
`
const Logo = styled.img`
  color: var(--secondaire);
  display: block;
  margin: auto;
  height: 500px;
  width: 500px;
  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;
  border: solid ${colors.tertiaire};
  background-color: ${colors.secondaire};
  border-radius: 20px 20px 20px 20px;
`

const Title = styled.h1`
  text-align: center;
`
const AfficherCreatePost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  cursor: pointer;
  margin-bottom: 10px;
`
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const PostsWrapper = styled.div``

function Posts() {
  localStorage.getItem('token')
  let history = useHistory()

  async function Disconect() {
    localStorage.removeItem('token')
    history.push('/')
  }

  const { data, isLoading, error } = useFetch(
    'http://localhost:4000/api/posts/'
  )
  if (error) {
    return <span>Il y a un problème</span>
  }

  return (
    <Body>
      <Button>
        <BouttonDeco onClick={Disconect}>Deconnexion</BouttonDeco>
      </Button>
      <Logo src={LogoImg} alt="Logo de Groupomania" />
      <Main>
        <Title> Actualités </Title>
        <AfficherCreatePost>
          <Details>
            <summary>
              Créer une nouvelle publication{' '}
              <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
            </summary>
            <CreatePost />
          </Details>
        </AfficherCreatePost>
        {isLoading ? (
          <LoaderWrapper>
            <Loader data-testid="loader" />
          </LoaderWrapper>
        ) : (
          <PostsWrapper>
            {data?.map((post, index) => (
              <Post
                key={`${post._id}-${index}`}
                _id={post._id}
                userName={post.userName}
                title={post.title}
                imageUrl={post.imageUrl}
                text={post.text}
                likes={post.likes}
                dislikes={post.dislikes}
                userId={post.userId}
              />
            ))}
          </PostsWrapper>
        )}
      </Main>
    </Body>
  )
}

export default Posts
