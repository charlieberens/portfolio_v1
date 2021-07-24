import React from 'react'
import Helmet from "react-helmet";
import { withPrefix } from "gatsby";

export default function BoidsCanvas() {
    return (
        <>
            <canvas id="boids-canvas"></canvas>
            <Helmet>
                <script src={withPrefix('js/boids.js')} type="text/javascript"></script>
            </Helmet>
        </>
    )
}
<Helmet>
<script src={withPrefix('js/three.js')} type="text/javascript"></script>
{/* <script src={withPrefix('js/rayMarching.js')} type="text/javascript"></script> */}
</Helmet>
