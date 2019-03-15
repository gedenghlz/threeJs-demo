import 'three/examples/js/controls/OrbitControls';
import '../css/reset.css';

function ThreeDemoTpl(params) {
	this.renderer = null;
	this.camera = null;
	this.controls = null;
	this.scene = null;
	this.spotLight = null;
	this.params = {};
	if (Object.prototype.toString.call(params) === '[object Object]') {
		Object.assign(this.params, params)
	}
	this.init();
}
Object.assign(ThreeDemoTpl.prototype, {
	init:function() {
		this.initScene();
		this.initRenderer();
		this.initCamera();
		this.params.isAddLight && this.initLight();
		this.initControls();
		this.params.isHasGridHelper && this.getGridHelper()
	},
	getGridHelper:function() {
		const gridHelper = new THREE.GridHelper(1200, 50, 0xFF4444, 0x404040);
		this.scene.add(gridHelper);
	},
	/* 场景 */
	initScene:function() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xEEEED1);
	},
	initRenderer:function() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(0xe0e0e0);
		this.renderer.autoClear = true; // 自动清除
		document.body.appendChild(this.renderer.domElement);
	},
	/* 相机 */
	initCamera:function() {
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
		this.camera.position.set(100, 500, 500);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		this.clock = new THREE.Clock();//用于更新轨道控制器
	},

	initLight:function() {
		var ambientLight = new THREE.AmbientLight({color: 0x404040});
        this.scene.add(ambientLight);
	},
	/* 控制器 */
	initControls:function() {
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.minDistance = 100;
		this.controls.maxDistance = 5000;
		this.controls.update();
	}
})
export default ThreeDemoTpl;