import 'three/examples/js/controls/OrbitControls';

function ThreeDemoTpl() {
	this.renderer = null;
	this.camera = null;
	this.controls = null;
	this.scene = null;
}
Object.assign(ThreeDemoTpl.prototype, {
	/* 场景 */
	initScene() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x050505);
	},
	initRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor( 0x050505 );
		document.body.appendChild(this.renderer.domElement);
	},
	/* 相机 */
	initCamera() {
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
		this.camera.position.set(100, 10, 15);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	},

	initLight() {
		this.scene.add(new THREE.AmbientLight(0x0c0c0c));

		let spotLight = new THREE.SpotLight(0xffffff);
		spotLight.position.set(-400, -400, -400);

		let spotLight2 = new THREE.SpotLight(0xffffff);
		spotLight2.position.set(400, 800, 400);

		this.scene.add(spotLight);
		this.scene.add(spotLight2);
	},
	/* 控制器 */
	initControls() {
		this.controls = new THREE.OrbitControls(this.camera,this.renderer.domElement);
		this.controls.minDistance = 100;
		this.controls.maxDistance = 5000;
		this.controls.update();
	}
})
export default ThreeDemoTpl;