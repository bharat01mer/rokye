import {Layout,About as AboutComp} from "../src/components"

const About = () => {
  return (
    <Layout title={"About"} description={"About Page"}>
      <AboutComp />
    </Layout>
  )
}

export default About