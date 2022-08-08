import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from '../../utils/style/colors'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: flex-end;
`
const Label = styled.label`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
`
const Input=styled.input`
width:200px;
height:25px;
display:flex;
margin:5px;
padding:5px;
border-radius:30px 30px 30px 30px;
border:none
`

const Button = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  text-decoration: none;
`

const BouttonLogin = styled.button`
  background-color: ${colors.quaternaire};
  color: ${colors.primaire};
  border-color: aquamarine;
  width: 80px;
  margin: 5px;
  padding: 10px;
  border-radius: 30px 30px 30px 30px;
`

function MyForm() {
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Form>
      <Label>
        email:
        <Input
          type="email"
          value={email}
          onChange={(e) => setMail(e.target.value)}
        />
      </Label>
      <Label>
        password:
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Label>
      <Button>
        <Link to="/posts">
          <BouttonLogin>Login</BouttonLogin>
        </Link>
      </Button>
    </Form>
  )
}
export default MyForm
