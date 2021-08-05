import React from 'react'
import Helmet from "react-helmet";
import { withPrefix } from "gatsby";

export default function RaymarchCanvas() {
    return (
        <>
            <div id="raymarch-canvas-cont">
            </div>
            <Helmet>
                <script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js' type="text/javascript"></script>
                <script src={withPrefix('js/raymarch.js')} type="text/javascript"></script>
            </Helmet>
        </>
    )
}
