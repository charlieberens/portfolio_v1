if(typeof window !== 'undefined' && window.document) {
    fetch('fragment.glsl')
    .then(response => response.text())
    .then((data) => {
      const vertexShader = `void main(){
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`;
  
      const fragmentShader = data;
  
      let width = window.innerWidth;
      let height = window.innerHeight;
  
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 500);
  
      const renderer = new THREE.WebGLRenderer({antialias: false, alpha: true});
      renderer.setClearColor(0x00000,0);
      renderer.setSize( width, height );
      window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;

        camera.left = -width / 2;
        camera.right = -width / 2;
        camera.top = -height / 2;
        camera.bottom = -height / 2;

        mesh.material.uniforms.width.value = width;
        mesh.material.uniforms.height.value = height;

        renderer.setSize( width, height );
        console.log(renderer);
        }, false);
  
      document.getElementById('raymarch-canvas-cont').appendChild(renderer.domElement);
  
      const geometry = new THREE.PlaneGeometry(width, height);
      // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      let material = new THREE.ShaderMaterial({
          uniforms: {
              planeDistance: {value: 800}, //Distance from camera to the pixel rectangle
              deMinThreshold: {value: .1},
              deMaxThreshold: {value: 1000},
              glowThreshold: {value: 5},
              bgColor: {value: new THREE.Vector4(.1,.1,.1,1)},
              lightRayPos: {value: new THREE.Vector3(300, -300, 600)},
              lightRayDir: {value: new THREE.Vector3(1, -1, 1)},
              lightRayColor: {value: new THREE.Vector4(.8,.8,.8, 1.1)}, //r,g,b,strength
              lightFalloffDistance: {value: 1300},
              shadowThreshold: {value: 25},
              shadowStength: {value: .8}, //Lower is darker
              mousePos: {value: new THREE.Vector3(800, 1800, 1300)},
              shapeSize: {value: 400},
              scrollVal: {value: 0},
              width: {value: width},
              height: {value: height},
              time: {value: 23}
          },
          vertexShader,
          fragmentShader
      });
  
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
  
      camera.position.z = 1;
  
      let mouse = [0, 0];
      document.addEventListener('mousemove', e => {
          var rect = document.querySelector('canvas').getBoundingClientRect();
          mouse = [e.clientX - rect.left - width / 2, rect.top - e.clientY + height / 2];
      });
      
      let scroll = document.documentElement.scrollTop; 
      document.onscroll = e => {
          scroll = document.documentElement.scrollTop;
      };
    
      function render() {
          requestAnimationFrame(render);
          renderer.render(scene, camera);
          mesh.material.uniforms.mousePos.value = new THREE.Vector3(mouse[0], mouse[1], 1300);
          mesh.material.uniforms.scrollVal.value = scroll / window.innerHeight;
        //   mesh.material.uniforms.time.value += .05;
        //   console.log(mesh.material.uniforms.time.value)
      }
      render();
  
  });  
}
