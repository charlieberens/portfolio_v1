if(typeof window !== 'undefined' && window.document) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, .1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#111d42");
    renderer.setSize(500, 500);
    document.querySelector("#raymarch-canvas").appendChild(renderer.domElement);

    renderer.render(scene, camera);

    const geometry = new THREE.SphereGeometry( 5, 16, 16 );
    const material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
    const sphere = new THREE.Mesh( geometry, material );

    camera.updateProjectionMatrix();

    scene.add(sphere)

}
