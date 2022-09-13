import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useState } from 'react'

const CreatePostWrapper=styled.div`
display:flex;
flex-direction:column;
margin-left:20 px;
`
const PostContent=styled.div
`display:flex;
flex-direction:column;
border-bottom :solid pink;`

const Label=styled.label`
`

const InputTitre=styled.input`
border-radius:30px 30px 30px 30px;
padding-left:20px;
max-width: 300px
`
const InputText=styled.input`
border-radius:30px 30px 30px 30px;
max-width: 500px;

`
const InputImage=styled.input`

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
    


function ModifyPost({_id}) {


  const token=localStorage.getItem("token")
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [picture, setPicture] = useState('')


  async function ModifyPostData(){ 
    let formData= new FormData();

    formData.append("title",title);
    formData.append("text",text);
    formData.append("image",picture);
if((title.length===0)||(text.length===0)){
  return
}
    await  fetch('http://localhost:4000/api/posts/'+_id,{
    method:'PUT',
    headers: {

      'Authorization': 'Bearer ' + token
    },
    body:formData,
  })
    }

  
    return (
        <CreatePostWrapper>
           <PostContent>
        <Label htmlFor ="titre" >Titre</Label>
          <InputTitre type="string" value={title}      onChange={(e) => setTitle(e.target.value)}  className="titre"/>
          <Label htmlFor="texte">Texte</Label>
          <InputText type="string" value={text}      onChange={(e) => setText(e.target.value)}  className="texte"/>
          <Label htmlFor="image">Image</Label>
          <InputImage type="file"       onChange={(e) => setPicture(e.target.files[0])}   className="image"/>        
         </PostContent>
          <Boutton className="poster" onClick={ModifyPostData}>Envoyer</Boutton>
      </CreatePostWrapper>
    )
  }
  

 
  export default ModifyPost

  
