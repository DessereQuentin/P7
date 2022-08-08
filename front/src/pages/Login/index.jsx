import { Link } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import LogoImg from '../../assets/icon-left-font-monochrome-black.png'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.secondaire};
`

const Logo = styled.img`
  display: block;
  margin: auto;
  max-height: 500px;
  max-width: 500px;
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

function Login() {
  return (
    <Body>
      <Logo src={LogoImg} />
      <LoginForm/>
          </Body>
  )
}

export default Login
