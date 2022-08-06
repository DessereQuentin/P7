
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import LogoImg from '../../assets/icon-left-font-monochrome-black.png'


const Body = styled.div`

display:flex;
flex-direction:column;
background-color: ${colors.secondaire};
`

const Logo = styled.img`

display:block;
margin:auto;
max-height:500px;
max-width:500px;
  `
  const Button=styled.div`
  display:flex;
  flex-direction:column;
  margin:auto;
  text-decoration:none;
  `

   
  const Login=styled.button`

  background-color:#0dbcbc;
  color:var(--primaire);
  border-color:aquamarine;
  width:80px;
  margin:5px;
  padding:10px;
  border-radius:30px 30px 30px 30px;
  `

function pageLogin() {
  return (
 
    <Body>
     
                    <Logo src={LogoImg} />
                    <Button>
                                 
               <Login>Login</Login>
             
               </Button>
           </Body>
  
  )
}

export default pageLogin
