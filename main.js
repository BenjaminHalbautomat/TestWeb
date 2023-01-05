import "./style.css";
import * as THREE from 'three.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

//basic torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);
torus.position.z -= 30;
torus.position.x -= 30;
//--------

//lightedTorus
const lightedMat = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus2 = new THREE.Mesh(geometry, lightedMat);
torus2.position.z -= 30;
torus2.position.x += 30;
//---------

//light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight);
//---------

const gridHelper = new THREE.GridHelper(200, 50);

const spaceImage =new THREE.TextureLoader().load('milky-way-starry-sky-night-sky-star-956981.jpeg');
scene.background = spaceImage;

scene.add(torus2);
scene.add(torus);
scene.add(pointLight, ambientLight, lightHelper);
scene.add(gridHelper);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill().forEach(addStar);

function animate() {
  requestAnimationFrame(animate);
 
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x += 0.01;
  torus2.rotation.y += 0.005;
  torus2.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()