import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import DefaultPicture from '../../assets/profile.png'
import ModifyPost from '../ModifyPost'


const PostCard = styled.div`
  background-color: ${colors.noumerocinqo};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 50px;
`

const Username = styled.h2``

const Tittle = styled.h3`
  text-decoration: underline;
`
const PostContent = styled.div`
  padding: 10px;
  display: flex;
  text-align: justify;
`
const Picture = styled.img`
border-radius:100px 100px 100px 100px;
  margin-right: 10px;
    display: flex;
  width: 200px;
  height: 200px;
`

const Text = styled.p``
const LikesDislikes = styled.div`
  display: flex;
  align-items: baseline;
`

const LikesPicture = styled.div`
  width: 20px;
  height: 20px;
  background-color: black;
`

const DislikesPicture = styled.div`
  width: 20px;
  height: 20px;
  background-color: green;
`

const PostSettings = styled.div``

const Boutton = styled.button`
  background-color: ${colors.quaternaire};
  color: ${colors.primaire};
  border-color: aquamarine;
  width: 120px;
  margin: 5px;
  padding: 10px;
  border-radius: 30px 30px 30px 30px;
`

function Post({ _id,userName, title, imageUrl, text, likes, dislikes }) {
  const userId = localStorage.getItem('userId')
  const token=localStorage.getItem("token")

  async function Supprimer() {

    await fetch('http://localhost:4000/api/posts/'+_id, {
      method: 'DELETE',
      headers: {
            'Authorization': 'Bearer ' + token
      },
    })
  }

 async function Likes() {
    const like = 1
    await fetch('http://localhost:4000/api/posts/'+ _id + '/like', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, like }),
    })
  }
  
  async function Dislikes() {
   const  like = -1
    await fetch('http://localhost:4000/api/posts/'+ _id + '/like', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, like }),
    })
  }
  return (
    <PostCard >
      <Username>{userName}</Username>
      <Tittle>{title}</Tittle>
      <PostContent>
        <Picture src={ imageUrl} alt="image du Post" />
        <Text>{text}</Text>
      </PostContent>
      <LikesDislikes>
        <LikesPicture onClick={Likes} />
        {likes}
        <DislikesPicture onClick={Dislikes} />
        {dislikes}
      </LikesDislikes>
      <PostSettings>
        <details>
          <summary>  <Boutton>Settings</Boutton></summary>
          <Boutton onClick={Supprimer}>Supprimer</Boutton>
          <details>
            <summary>
          <Boutton >Modifier</Boutton>
          </summary>
                 <ModifyPost _id={_id}/>
                 </details>
        </details>
      </PostSettings>
    </PostCard>
  )
}

Post.propTypes = {
  _id:PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  disLikes: PropTypes.number.isRequired,
}

Post.defaultProps = {
  _id:'yo',
  userName: 'JeanMi',
  title: 'CegenredePost',
  imageUrl: DefaultPicture,
  text:
    'gjgkjhggggggghkjjjjjjjjjjjjjjjjjdfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggjjjjjjjjjjjjjjjjjjjjjjjjjjgggggg',
  likes: 0,
  disLikes: 0,
}
export default Post
