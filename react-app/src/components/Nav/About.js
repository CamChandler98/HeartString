import styled from 'styled-components'
import githubIcon from '../graphics/github-icon.svg'

import linkedinIcon from '../graphics/linkedin-icon.svg'


const AboutStyle = styled.div`
    .about-container{
        display:flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }
    img{
        height: 40px;
        width: 40px;
    }
`
const About = () => {


    return(
        <AboutStyle>
        <div className = 'about-container'>
            <span className = 'about-text'>
                Made With Love By Cam Chandler
            </span>
                <a href = 'https://github.com/CamChandler98'>
                <img src = {githubIcon} alt = 'cam chandler github' />
                <span>Github</span>
                </a>
                <a href = 'https://www.linkedin.com/in/cameron-chandler-586891160/'>
                <img src = {linkedinIcon} alt = 'cam chandler linkedin' />
                </a>
                <span>LinkedIn</span>
        </div>
        </AboutStyle>
    )
}


export default About
