import * as React from "react";
import BoidsCanvas from '../components/boids_canvas.jsx';
import RaymarchCanvas from '../components/raymarch_canvas.jsx';
import { SiNodeDotJs, SiTypescript, SiReact, SiGatsby, SiMongodb, SiVueDotJs, SiFlask, SiPython, SiSass, SiJava, SiJavascript, SiHtml5, SiCss3, SiWebgl, SiJquery, SiGithub, SiTwitter, SiGmail } from "react-icons/si";

import Form from '../components/form';

import '../styles/main.scss';
import '../styles/index.scss';
import { withPrefix } from "gatsby";

// data
const projects = [
  {
    title: "Spotify Playlist Filterer",
    text: "Filter Spotify playlists based on danceability, energy, joyfulness, etc.",
    technologies: [
      <SiJavascript title="Javascript"/>,
      <SiJquery title="Javascript"/>,
    ],
    img: 'spotify-filterer.png',
    link: 'https://www.charlieberens.org/playlistmaker/'
  },
  {
    title: "Tutorease",
    text: "A tool to help independent educators assign their students questions",
    technologies: [
      <SiReact title="React"/>,
      <SiNodeDotJs title="Node JS"/>,
      <SiMongodb title="MongoDB"/>,
      <SiJavascript title="Javascript"/>,
    ],
    img: 'tutorease.png',
    link: 'https://tutorease.herokuapp.com/'
  },
  {
    title: "Go Travel Sites",
    text: "A new primary website for The Go Travel Sites, a travel-oriented web design business (Not yet live)",
    technologies: [
      <SiVueDotJs title="Vue.JS"/>,
      <SiJavascript title="Javascript"/>,
    ],
    img: 'gotravelsites.png',
    link: 'https://cbtestbed.dreamhosters.com/gts-redesign/index'
  },
  {
    title: "Portfolio V1",
    text: "My personal web design portfolio",
    technologies: [
      <SiWebgl title="WebGL & Three.js"/>,
      <SiReact title="React"/>,
      <SiGatsby title="Gatsby"/>,
      <SiJavascript title="Javascript"/>,
      <SiSass title="SASS"/>
    ],
    img: 'portfolio.png',
    link: '/'
  },
]

// markup
const IndexPage = () => {
  return (
    <main>
      <header className="center-flex fh" id="boids-header">
        <div id="header-center">
          {/* <BoidsCanvas/> */}
          <div id="header-text-cont">
            <span>Hey I'm</span>
            <h1>Charlie Berens</h1>
            {/* <span>Fullstack developer</span> */}
          </div>
          <RaymarchCanvas/>
        </div>
      </header>
      <section>
        <div className="section-main left">
          <div className="section-side">
            <h2>About Me</h2>
            <p>
              I am a 17 year old High School senior from Salt Lake City, UT. Computer Science is my passion. 
            </p>
            <p>I started coding when I was 12, so needless to say I have acquired a few skills. Here are a few of my favorites </p>
            <div id="about-skills-cont-alligner">
              <div id="about-skills-cont">
                <SiNodeDotJs title="NodeJS"/>
                <SiTypescript title="Typescript"/>
                <SiVueDotJs title="Vue.js"/>
                <SiReact title="React"/>
                <SiGatsby title="Gatsby"/>
                <SiMongodb title="MongoDB"/>
                <SiSass title="SASS"/>
                <SiPython title="Python"/>
                <SiFlask title="Flask"/>
                <SiJava title="Java"/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="section-main left">
          <div className="section-side">
            <h2>My projects</h2>
            <p>
              Though I have been building things for the web since I was 12, I didn't create anything decent until 2019. Here are a few projects I'm proud of:
            </p>
            <div className="projects-cont">
              {projects.map(project => 
                <a className="project" href={project.link}>
                  <img className="project-img" src={withPrefix(`images/projects/${project.img}`)}/>
                  <div className="project-right">
                    <div>
                      <h3 className="project-title">{project.title}</h3>
                      <span className="project-text">{project.text}</span>
                    </div>
                    <div className="project-tech-cont">
                      {project.technologies}
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="section-main left">
          <div className="section-side">
            <h2>Get in touch</h2>
            <p>
              I am always looking for new projects. If you have an interesting idea or a story to tell, message me. I would love to collaborate with you.
            </p>
            <Form/>
          </div>
          <div className="section-side">
          </div>
        </div>
      </section>
      <footer>
        <span id="footer-name">Charlie Berens</span>
        <div id="footer-sm-cont">
          <a href="https://github.com/charlieberens">
            <SiGithub title="Github"/>
          </a>
          <a href="https://twitter.com/charliejberens">
            <SiTwitter title="Twitter"/>
          </a>
          <a href="mailto:charliejberens@gmail.com">
            <SiGmail title="Email"/>
          </a>
        </div>
      </footer>
    </main>
  )
}

export default IndexPage
