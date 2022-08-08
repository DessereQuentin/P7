import Post from '../../components/Post'
import CreatePost from '../../components/CreatePost'
import styled from 'styled-components'

import colors from '../../utils/style/colors'
import LogoImg from '../../assets/icon-left-font-monochrome-black.png'

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
const Logo=styled.img`
color:var(--secondaire);
display:block;
margin:auto;
height:400px;
width:400px;
`
  const Main = styled.div`
  display:flex;
    flex-direction:column;
    width:70%;
    margin:auto;
border:solid ${colors.tertiaire};
background-color:${colors.secondaire};
border-radius:20px 20px 20px 20px;
`
const Title=styled.h1`
text-align:center;

`
const AfficherCreatePost=styled.div`
display:flex;
flex-direction:column;
align-items:baseline;
cursor:pointer;
`
const PostsWrapper=styled.div`

`

function Posts() {
 /**   const { data, isLoading, error } = useFetch(
    `http://localhost:8000/freelances`
  )

  const freelancersList = data?.freelancersList

  if (error) {
    return <span>Il y a un problème</span>
  }
*/
  return (
    <Body>
                <Button>
        <BouttonDeco>Deconnexion</BouttonDeco>
      </Button>
        <Logo src={LogoImg} />
       <Main>
       <Title> Actualités </Title>
       <AfficherCreatePost>
        <details>
          <summary>
       Créer une nouvelle publication
       fontawesome
       </summary>
       <CreatePost/>
       </details>
       </AfficherCreatePost>
       <PostsWrapper>
        <Post/>
       </PostsWrapper>
       </Main>
     
    </Body>
  )
}

export default Posts
