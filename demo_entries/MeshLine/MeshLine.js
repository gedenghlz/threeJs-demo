import ThreeTpl from '../../lib/js/baseTemplate';

function MeshLineDemo() {

}

Object.assign(MeshLineDemo.prototype, new ThreeTpl(), {
	init() {
		this.initScene();
		this.initRenderer();
		this.initCamera();
		this.initLight();
		this.initControls();
		this.initContent();
		this.animate = this.animate.bind(this);
		this.animate();
	},
	/* 循环渲染 */
	animate() {
		requestAnimationFrame(this.animate);
		this.renderer.render(this.scene, this.camera);
	},
	/* 场景中的内容 */
	initContent() {
		var clock = new THREE.Clock();
		// this.scene.add(clock);




	},

})