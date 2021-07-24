import * as React from "react";
import BoidsCanvas from '../components/boids_canvas.jsx';
import RaymarchCanvas from '../components/raymarch_canvas.jsx';

import '../styles/main.scss';
import '../styles/index.scss';

// data

// markup
const IndexPage = () => {
  return (
    <main>
      <header className="center-flex fh" id="boids-header">
        <div>
          <BoidsCanvas/>
          <div id="header-text-cont">
            <span>Hi you're looking at</span>
            <h1>Charlie Berens</h1>
            <span>Fullstack developer</span>
          </div>
        </div>
      </header>
      <section>
        <div className="section-main left">
          <div className="section-side">
            <h2>About Me</h2>
          </div>
          <div className="section-side">
            <RaymarchCanvas/>
          </div>
          {/* <RayMarchScript/> */}
        </div>
      </section>
    </main>
  )
}

export default IndexPage
