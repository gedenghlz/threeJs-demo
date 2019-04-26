import ThreeTpl from '../../lib/js/baseTemplate';

function FogDemo() {
	this.init();
}

var threeTpl = new ThreeTpl({});
threeTpl.rootInit();

Object.assign(  FogDemo.prototype, threeTpl, {
	constructor: FogDemo,
	init: function () {
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.scene.fog = new THREE.Fog(0xffffff,0.15,100);
		this.animate = this.animate.bind(this);
		this.camera.position.set(10, 50, 50);
		this.controls.minDistance = 10;
		this.controls.maxDistance = 200;
		this.initObjects();
		this.initLight();
		this.animate();
	},
	initObjects: function () {
		//绘制一个平面接收阴影
		var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
		var planeMaterial = new THREE.MeshLambertMaterial({
			color: Math.random() * 0xcccccc
		});
		this.planeGeometry = planeGeometry;
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.receiveShadow = true;
		plane.rotation.x = -0.5 * Math.PI;
		this.plane = plane;
		this.scene.add(plane);

		for (var i = 0; i < 60; i++) {
			this.addBox();
		}

	},
	addBox: function () {
		var size = Math.ceil(Math.random() * 3)
		var geometry = new THREE.BoxGeometry(size, size,size);
		var material = new THREE.MeshLambertMaterial({
			color: Math.random() * 0xffffff
		})
		var mesh = new THREE.Mesh(geometry, material);
		//castShadow:对象是否产生阴影
		mesh.castShadow = true;
		mesh.position.set(-30 + Math.round(Math.random() * this.planeGeometry.parameters.width), 5 + Math.round(Math.random() * 5), -20 + Math.round(Math.random() * this.planeGeometry.parameters.height));
		this.scene.add(mesh);
	},
	animate: function () {
		var self = this;
		this.stats.update();
		requestAnimationFrame(this.animate);
		//traverse:继承自object3D的方法，可以在回调中操作后代元素
		//类似的还有traverseVisible类似traverse，但回调函数只对可见的对象执行，不可见对象的后代将不遍历
		//traverseAncestors:遍历所有的祖先
		this.scene.traverse(function (e) {
			if (e instanceof THREE.Mesh && e != self.plane) {
				e.rotation.x += 0.05
				e.rotation.y += 0.05;
				e.rotation.z += 0.05;
			}
		});

		this.renderer.render(this.scene, this.camera)
	},
	initLight: function () {
		let spotLight = new THREE.SpotLight(0xffffff);
		spotLight.position.set(-40, 60, -10);
		spotLight.castShadow = true;

		//让阴影不模糊
		spotLight.shadow.mapSize.width = 2048;
		spotLight.shadow.mapSize.height = 2048;
		this.scene.add(spotLight);
	},
})

new FogDemo();