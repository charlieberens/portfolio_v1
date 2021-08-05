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

        mesh.material.uniforms.shapePos.value = new THREE.Vector3(width > mobileBreak ? width/4 : 0, 0, 1100);

        renderer.setSize( width, height );
      }, false);
  
      document.getElementById('raymarch-canvas-cont').appendChild(renderer.domElement);
      
      const geometry = new THREE.PlaneGeometry(width, height);
      // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const mobileBreak = 850;
      let material = new THREE.ShaderMaterial({
          uniforms: {
              planeDistance: {value: 800}, //Distance from camera to the pixel rectangle
              deMinThreshold: {value: .1},
              deMaxThreshold: {value: 1000},
              glowThreshold: {value: 5},
              bgColor: {value: new THREE.Vector4(.1,.1,.1,1)},
              shapePos: {value: new THREE.Vector3(width > mobileBreak ? width/4 : 0, 0, 1100)},
              shapeSize: {value: 250},
              lightRayPos: {value: new THREE.Vector3(300, -300, 600)},
              lightRayDir: {value: new THREE.Vector3(1, -1, 1)},
              lightRayColor: {value: new THREE.Vector4(.8,.8,.8, 1.1)}, //r,g,b,strength
              lightFalloffDistance: {value: 1300},
              shadowThreshold: {value: 25},
              shadowStength: {value: .8}, //Lower is darker
              mouseExists: {value: width > mobileBreak},
              mousePos: {value: new THREE.Vector3(800, 1800, 1100)},
              mouseRatios: {value: new THREE.Vector2(0, 0)}, //(x/z, y/z) Calculated here so i'ts only calculated once per frame not, one per pixel for frame
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

      const sections = document.getElementsByClassName('rayt-sec');
      let currentSection = sections[0];

      let firstRender = true;

      function render() {
          requestAnimationFrame(render);
          renderer.render(scene, camera);
          mesh.material.uniforms.mousePos.value = new THREE.Vector3(mouse[0], mouse[1], mesh.material.uniforms.mousePos.value.z);
          mesh.material.uniforms.mouseRatios.value = new THREE.Vector2(Math.atan2(mouse[0], mesh.material.uniforms.planeDistance.value), Math.atan2(mouse[1], mesh.material.uniforms.planeDistance.value));
          
          let scroll = document.documentElement.scrollTop;
          let scrolledPastCount = 0;
          let i = 0;
          while(i < sections.length){
            if(sections[i].getBoundingClientRect().top <= 0 ){ //Sections that have been scrolled past
              scrolledPastCount += 1;
              currentSection = sections[i];
            }
            i++;
          }
          mesh.material.uniforms.scrollVal.value = (-currentSection.getBoundingClientRect().top) / currentSection.offsetHeight + scrolledPastCount - 1;
          
          mesh.material.uniforms.time.value += .5;
        if(firstRender){
          document.getElementsByTagName('body')[0].classList.add('loaded');
          document.getElementById('loading-overlay').classList.add('loaded');
          document.getElementById('loading-overlay').addEventListener("transitionend", function() {
            this.style.display = "none";
          });
          firstRender = false;
        }
      }
      render();
  });
}
