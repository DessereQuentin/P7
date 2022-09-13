import { Link } from 'react-router-dom'
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

  @media only screen and (max-width:768px){
    width:100%;
  }
`
const Button = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom:400px;
  text-decoration: none;
`

const Signup = styled.button`
  background-color: #0dbcbc;
  color: black;
  border-color: aquamarine;
  width: 80px;
  margin: 5px;
  padding: 10px;
  border-radius: 30px 30px 30px 30px;
`
const Login = styled.button`
  background-color: #0dbcbc;
  color:black;
  border-color: aquamarine;
  width: 80px;
  margin: 5px;
  padding: 10px;
  border-radius: 30px 30px 30px 30px;
`

function Home() {
  return (
    <Body>
      <Logo src={LogoImg} alt="Logo de Groupomania" />
      <Button>
        <Link to="/signup">
          <Signup>Signup</Signup>
        </Link>
        <Link to="/login">
          <Login>Login</Login>
        </Link>
      </Button>
    </Body>
  )
}

export default Home
