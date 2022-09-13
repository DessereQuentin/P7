import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import DefaultPicture from '../../assets/profile.png'
import ModifyPost from '../ModifyPost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faThumbsUp,  faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import './style.css'

const PostCard = styled.div`
  background-color: ${colors.cinq};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 50px;
  padding-bottom:10px;
`

const UserName = styled.h2`
padding-left: 20px;
padding-top:10px;`

const Title = styled.h3`
  margin-left: 50px;
  text-decoration: underline;
`
const PostContent = styled.div`
  padding: 10px;
  display: flex;
  text-align: justify;
  @media only screen and (max-width:768px){
    flex-direction:column;
   
   margin:auto;
    }
`
const Picture = styled.img`
  border-radius: 100px 100px 100px 100px;
  margin: 15px;
  display: flex;
  width: 180px;
  height: 180px;
  @media only screen and (max-width:768px){
    margin:auto;
    margin-bottom:15px;
       }
`

const Text = styled.p`
  margin: 15px;
  width: 90%;
  border-radius: 45px 45px 45px 45px;
  padding: 25px;
  background-color: ${colors.secondaire};
  text-align:left;
  max-width:70%;
  margin:auto;

  
`

const LikesDislikes = styled.div`
  display: flex;
  margin: 25px;
  padding: 20px;
  max-width: 80px;
  background-color: ${colors.secondaire};
  justify-content: space-between;
  cursor:pointer;
  border-radius: 30px 30px 30px 30px;
  @media only screen and (max-width:768px){
    margin:auto;
       }
`

const PostSettings = styled.div`
`

const Boutton = styled.button`
font-size:16px;
  background-color: ${colors.quaternaire};
  color:black;
  border-color: aquamarine;
  width: 120px;
  margin: 5px;
  padding: 10px;
  border-radius: 30px 30px 30px 30px;
  cursor:pointer;
  `
  const Details=styled.details`
  margin-left:20px;
    `
const Summary=styled.summary`
background-color: ${colors.quaternaire};
color:black;
border:20px;
border-color: aquamarine;
width: 100px;
margin: 5px;
padding: 10px;
border-radius: 30px 30px 30px 30px;
text-align:center;
cursor:pointer;
border-width: 2px;
border-style: outset;


`
function Post({ _id, userName, title, imageUrl, text, likes, dislikes,userId}) {
  const CurrentuserId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')
  let SettingClass;

if((localStorage.getItem('isAdmin')==="true")||(CurrentuserId===userId)){
  SettingClass= "Authorize"
}else{
      SettingClass="Unauthorize"
  }


  async function Supprimer() {
    await fetch('http://localhost:4000/api/posts/' + _id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
  }

  async function Likes() {
    
    const like = 1
    await fetch('http://localhost:4000/api/posts/' + _id + '/like', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ CurrentuserId, like }),
    })
  }

  async function Dislikes() {
    const like = -1
    await fetch('http://localhost:4000/api/posts/' + _id + '/like', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ CurrentuserId, like }),
    })
  }
  return (
    <PostCard>
      <UserName>{userName}</UserName>
      <Title>{title}</Title>
      <PostContent>
        <Picture src={imageUrl} alt="image du Post" />
        <Text>{text}</Text>
      </PostContent>
      <LikesDislikes>
        <FontAwesomeIcon icon={faThumbsUp} onClick={Likes}></FontAwesomeIcon>
        {likes}
        <FontAwesomeIcon
          icon={faThumbsDown}
          onClick={Dislikes}
        ></FontAwesomeIcon>
        {dislikes}
      </LikesDislikes>
      <PostSettings className={SettingClass} >
        <Details >
          <Summary>
           Settings
          </Summary>
          <Boutton onClick={Supprimer}>Supprimer</Boutton>
          <details>
            <Summary>
              Modifier
            </Summary>
            <ModifyPost _id={_id} />
          </details>
        </Details>
      </PostSettings>
    </PostCard>
  )
}

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  disLikes: PropTypes.number.isRequired,
}

Post.defaultProps = {
  _id: 'yo',
  userName: 'JeanMi',
  title: 'CegenredePost',
  imageUrl: DefaultPicture,
  text:
    'gjgkjhggggggghkjjjjjjjjjjjjjjjjjdfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggjjjjjjjjjjjjjjjjjjjjjjjjjjgggggg',
  likes: 0,
  disLikes: 0,
}
export default Post
