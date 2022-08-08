import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import DefaultPicture from '../../assets/profile.png'

const CardWrapper = styled.div`
background-color: ${colors.noumerocinqo};
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
margin-bottom:50px;
`

const Username=styled.h2``

const Tittle=styled.h3`
text-decoration:underline;
`
const PostContent=styled.div`

padding:10px;
display:flex;
justify-content:space-around;
text-align:justify;

`
const Picture=styled.img`
margin-right:10px;
display:flex;
 width:300px;
height:200px`

const Text=styled.text`

`

function Post({ username, title, picture, text }) {
  return (
    <CardWrapper>
      <Username>{username}</Username>
      <Tittle>{title}</Tittle>
      <PostContent>
      <Picture src={picture} />
      <Text>{text}</Text>
      </PostContent>
      </CardWrapper>
  )
}

Post.propTypes = {
    username:PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
   text: PropTypes.string.isRequired,
  }

  Post.defaultProps = {
    username: 'JeanMi',
    title: 'CegenredePost',
    picture: DefaultPicture,
    text:'gjgkjhggggggghkjjjjjjjjjjjjjjjjjdfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggjjjjjjjjjjjjjjjjjjjjjjjjjjgggggg'
  }
export default Post


/**function Card({ label, title, picture }) {
    return (
      <CardWrapper>
        <CardLabel>{label}</CardLabel>
        <CardImage src={picture} alt="freelance" />
        <CardTitle>{title}</CardTitle>
      </CardWrapper>
    )
  }
  
  Card.propTypes = {
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }
  
  Card.defaultProps = {
    label: '',
    title: '',
    picture: DefaultPicture,
  }
  
  export default Card*/