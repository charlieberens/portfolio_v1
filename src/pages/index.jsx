import * as React from "react"
import { useEffect } from "react"
import Helmet from "react-helmet"
import { withPrefix } from "gatsby"

import '../styles/main.scss'
import '../styles/index.scss'

// data

// markup
const IndexPage = () => {
  return (
    <main>
      <header className="center-flex fh" id="boids-header">
        <canvas id="boids-canvas"></canvas>
        <div>
          <div className="header-text-cont">
            <span>Hi you're looking at</span>
            <h1>Charlie Berens</h1>
            <span>Fullstack developer</span>
          </div>
          <div className="header-img-cont">
            <img src={`../static/images/Chapstick.JPG`} alt="A truly extraordinary picture of me, Charlie Berens"/>
          </div>
        </div>
      </header>
      <Helmet>
        <script src={withPrefix('../static/js/boids.js')} type="text/javascript"/>
      </Helmet>
    </main>
  )
}

export default IndexPage
