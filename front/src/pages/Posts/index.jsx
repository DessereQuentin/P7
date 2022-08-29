import Post from '../../components/Post'
import CreatePost from '../../components/CreatePost'
import { useFetch} from '../../utils/hooks'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import LogoImg from '../../assets/icon-left-font-monochrome-black.png'
import { Loader } from '../../utils/style/Atoms'
import { useHistory } from "react-router-dom";


const Body = styled.div`
  background-color: ${colors.secondaire};
`
const Button = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  text-decoration: none;
`
const BouttonDeco = styled.button`
  background-color: ${colors.quaternaire};
  color: ${colors.primaire};
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
  height: 400px;
  width: 400px;
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
  `
  const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const PostsWrapper = styled.div``

 function Posts() {

  localStorage.getItem("token")
  let history = useHistory();

  async function Disconect(){
    localStorage.removeItem("token");
    history.push("/")
  }

  const { data, isLoading, error } = useFetch('http://localhost:4000/api/posts/')
if (error) {
  return <span>Il y a un problème</span>
}



  return (
    <Body>
      <Button>
        <BouttonDeco onClick={Disconect}>Deconnexion</BouttonDeco>
      </Button>
      <Logo src={LogoImg} />
      <Main>
        <Title> Actualités </Title>
        <AfficherCreatePost>
          <details>
            <summary>Créer une nouvelle publication fontawesome</summary>
            <CreatePost />
          </details>
        </AfficherCreatePost>
       {isLoading ? (
        <LoaderWrapper>
          <Loader  data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <PostsWrapper>
      {data?.map((post,index)=>(
   <Post 
     key={`${post._id}-${index}`}
     _id={post._id}
     userName={post.userName}
     title={post.title}
     imageUrl={post.imageUrl}
     text={post.text}
     likes={post.likes}
     dislikes={post.dislikes}
    />
  ))}
        </PostsWrapper>
      )}
      </Main>
    </Body>
  )
}

export default Posts
