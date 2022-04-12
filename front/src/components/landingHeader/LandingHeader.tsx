import logo from 'src/logo.svg'
import { H1, H2, H3, H4, H5, H6 } from 'src/components/baseDesign/Headings'

const LandingHeader = () => {
  return (
    <header className="py-8">
      <img src={logo} alt="logo" className="w-40 md:w-60"/>
      <div className="pt-8">
        <H1>Lorem Ipsum</H1>
        <H2>Lorem Ipsum</H2>
        <H3>Lorem Ipsum</H3>
        <H4>Lorem Ipsum</H4>
        <H5>Lorem Ipsum</H5>
        <H6>Lorem Ipsum</H6>
        <p>Let's add some text here'</p>
      </div>
    </header>
  )
}

export default LandingHeader
