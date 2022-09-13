import { useState } from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'

const Form=styled.form`
display:flex;
flex-direction:column;
margin:auto;
`
const Label=styled.label`
display:flex;
align-items:baseline;
justify-content:flex-end;
`
const Input=styled.input`
width:200px;
height:25px;
display:flex;
margin:5px;
padding:5px;
border-radius:30px 30px 30px 30px;
border:none;
@media only screen and (max-width:320px){
   width 150px;
padding:none;
}
`


const Button = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  text-decoration: none;
`

const BouttonSignup = styled.button`
background-color: ${colors.quaternaire};
  color:lack;
  border-color: aquamarine;
  width: 80px;
  margin: 5px;
  margin-bottom:300px;
  padding: 10px;
  border-radius: 30px 30px 30px 30px;
`

function MyForm() {
  const [email, setMail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
const isAdmin=false;

  async function signup(e){
    e.preventDefault();

   await  fetch('http://localhost:4000/api/auth/signup',{
      method:"POST",
      headers: {
        'Accept': 'application.json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email,userName,password,isAdmin})

      
    })
    .then(response=>response.json())
    .then(response=>console.log(response))
    history.push('/login')
 }
     


  return (
    <Form>
          <Label>email:
        <Input
          type="email" 
          value={email}
          onChange={(e) => setMail(e.target.value)}
        />
      </Label>
          <Label>pseudo:
        <Input
          type="text" 
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Label>
            <Label>password:
        <Input
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Label>
       <Button>
      <Link to="/login">
        <BouttonSignup onClick={signup}>Signup</BouttonSignup>
        </Link>
      </Button>
    </Form>
  )
}
export default MyForm