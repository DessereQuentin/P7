import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const CreatePostWrapper=styled.div`
display:flex;
flex-direction:column;
`
const Label=styled.label``

const InputTitre=styled.input`
max-width: 300px
`
const InputText=styled.input`
max-width: 500px
`
const Boutton=styled.button`
background-color: ${colors.quaternaire};
color: ${colors.primaire};
border-color: aquamarine;
width: 120px;
margin: 5px;
padding: 10px;
border-radius: 30px 30px 30px 30px;
    `


function CreatePost() {
    return (
        <CreatePostWrapper>
        <Label for="titre">Titre</Label>
          <InputTitre type="text"  id="titre"/>
          <Label for="Texte">Texte</Label>
          <InputText type="text"  id="Texte"/>
          <Label for="image">Image</Label>
          <Boutton id="uploadImage">choisir fichier</Boutton>
      </CreatePostWrapper>
    )
  }
  

 
  export default CreatePost