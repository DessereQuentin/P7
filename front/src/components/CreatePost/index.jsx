import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useState } from 'react'


const CreatePostWrapper=styled.div`
display:flex;
flex-direction:column;
border-bottom :solid pink;
`
const PostContent=styled.div
`display:flex;
flex-direction:column;
`

const Label=styled.label`
cursor:pointer;
`

const InputTitre=styled.input`
border-radius:30px 30px 30px 30px;
max-width: 300px
`
const InputText=styled.input`
border-radius:30px 30px 30px 30px;
max-width: 500px
`
const InputImage=styled.input`
cursor:pointer;
`

const Boutton=styled.button`
font-size:16px;
background-color: ${colors.quaternaire};
color: black;
border-color: aquamarine;
width: 120px;
margin: 5px;
padding: 10px;
border-radius: 30px 30px 30px 30px;
cursor:pointer;
    `
    


function CreatePost() {


  const token=localStorage.getItem("token")
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [picture, setPicture] = useState('')


  async function CreatePostData(){ 
    let formData= new FormData();
    formData.append("title",title);
    formData.append("text",text);
    formData.append("image",picture);
   


    await  fetch('http://localhost:4000/api/posts/',{
    method:"POST",
    headers: {
    
      'Authorization': 'Bearer ' + token
    },
    body:formData
 
  })
window.location.reload()
    }

  
    return (
        <CreatePostWrapper>
           <PostContent>
        <Label htmlFor ="titre" >Titre</Label>
          <InputTitre type="string" value={title}      onChange={(e) => setTitle(e.target.value)}  id="titre"/>
          <Label htmlFor="texte">Texte</Label>
          <InputText type="string" value={text}      onChange={(e) => setText(e.target.value)}  id="texte"/>
          <Label htmlFor="image">Image</Label>
          <InputImage type="file"   onChange={(e) => setPicture(e.target.files[0])}   id="image"/>        
         </PostContent>
          <Boutton id="poster" onClick={CreatePostData}>Envoyer</Boutton>
      </CreatePostWrapper>
    )
  }
  

 
  export default CreatePost

  
