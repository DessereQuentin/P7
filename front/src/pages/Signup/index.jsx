
import SignupForm from '../../components/SignupForm'
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
function Signup() {
  return (
    <Body>
      <Logo src={LogoImg} />
      <SignupForm/>
              </Body>
  )
}

export default Signup
