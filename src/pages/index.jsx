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
            A Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
          </div>
          <div className="section-side">
          </div>
          {/* <RayMarchScript/> */}
        </div>
      </section>
    </main>
  )
}

export default IndexPage
