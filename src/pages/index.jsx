import * as React from "react";
import RaymarchCanvas from '../components/raymarch_canvas.jsx';
import { SiNodeDotJs, SiTypescript, SiReact, SiGatsby, SiMongodb, SiVueDotJs, SiFlask, SiPython, SiSass, SiJava, SiJavascript, SiHtml5, SiCss3, SiWebgl, SiJquery, SiGithub, SiTwitter } from "react-icons/si";
import { HiMail } from "react-icons/hi";
import Fade from 'react-reveal/Fade';

import Form from '../components/form';

import '../styles/main.scss';
import '../styles/index.scss';
import { withPrefix, SEO } from "gatsby";
import Helmet from "react-helmet";

// data
const projects = [
  {
    title: "Spotify Playlist Filterer",
    text: "Filter Spotify playlists based on danceability, energy, joyfulness, etc.",
    technologies: [
      <SiJavascript title="Javascript"/>,
      <SiJquery title="JQuery"/>,
    ],
    img: 'spotify-filterer.webp',
    link: 'https://www.songfilter.app'
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
    img: 'tutorease.webp',
    link: 'https://www.tutorease.org'
  },
  {
    title: "Go Travel Sites",
    text: "A new primary website for The Go Travel Sites, a travel-oriented web design business (Not yet live)",
    technologies: [
      <SiVueDotJs title="Vue.JS"/>,
      <SiJavascript title="Javascript"/>,
    ],
    img: 'gotravelsites.webp',
    link: 'https://cbtestbed.dreamhosters.com/gts-redesign/index'
  },
  {
    title: "This website",
    text: "My web design portfolio that includes a raymarching renderer",
    technologies: [
      <SiWebgl title="WebGL & Three.js"/>,
      <SiReact title="React"/>,
      <SiGatsby title="Gatsby"/>,
      <SiJavascript title="Javascript"/>,
      <SiSass title="SASS"/>
    ],
    img: 'portfolio_v1.webp',
    link: 'https://charlieberens.org'
  },
]

// markup
const IndexPage = () => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Charlie Berens</title>
        <link rel="canonical" href="https://charlieberens.org" />
      </Helmet>
      <div id="loading-overlay">
        <div id="loading-spinner">
          <div class="loading-spinner-dot"></div>
          <div class="loading-spinner-dot"></div>
          <div class="loading-spinner-dot"></div>
        </div>
      </div>
      {/* <SEO title="Charlie Berens" /> */}
      <RaymarchCanvas/>
      <header className="center-flex fh rayt-sec" id="boids-header">
        <div id="header-center" class="section-main">
          {/* <BoidsCanvas/> */}
          <div id="header-text-cont">
            <span>Hey I'm</span>
            <h1>Test Berens</h1>
            <span>I build things for the web</span>
          </div>
        </div>
      </header>
      <Fade left duration={850} distance="100px">
        <section class="rayt-sec fade">
          <div className="section-main left">
            <div className="section-side">
              <h2>About Me</h2>
              <p>
                I'm a High School senior from Salt Lake City, UT. Whether it's analyzing the association between temeprature and covid cases or creating an app to assign questions to my students, I love using code to solve problems.
              </p>
              <p>I started programming when I was 12, so needless to say I have acquired a few skills. Here are some of my favorites:</p>
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
      </Fade>
      <Fade left duration={850} distance="100px">
        <section class="rayt-sec fade">
          <div className="section-main left">
            <div className="section-side">
              <h2>My projects</h2>
              <p>
                Though I have been building things for the web since I was 12, I didn't create anything decent until 2019. Here are a few projects I'm proud of:
              </p>
              <div className="projects-cont">
                {projects.map(project => 
                  <a key={project.title} className="project" href={project.link}>
                    <img className="project-img" src={withPrefix(`images/projects/compressed/${project.img}`)} alt={`Preview of ${project.title}`}/>
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
      </Fade>
      <Fade left duration={850} distance="100px">
        <section class="rayt-sec fade">
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
      </Fade>
      <footer>
        <span id="footer-name">&copy; Charlie Berens 2021</span>
        <div id="footer-sm-cont">
          <a href="https://github.com/charlieberens">
            <SiGithub title="Github"/>
          </a>
          <a href="https://twitter.com/charliejberens">
            <SiTwitter title="Twitter"/>
          </a>
          <a href="mailto:charliejberens@gmail.com">
            <HiMail title="Email"/>
          </a>
        </div>
      </footer>
    </main>
  )
}

export default IndexPage
