import ThreeTpl from '../../lib/js/baseTemplate';

function MeshLineDemo() {
	this.delta = null;
	this.init();
}

Object.assign(MeshLineDemo.prototype, new ThreeTpl({
	isAddLight: true,
	isHasGridHelper: true
}), {
	init: function () {
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.initContent();
		this.initLight();
		this.animate = this.animate.bind(this);
		this.animate();
	},
	initLight:function() {
		let spotLight = new THREE.SpotLight(0xcccccc);
		spotLight.position.set(-100, 300, 10);
		spotLight.castShadow = true;

		//让阴影不模糊
		spotLight.shadow.mapSize.width = 2048;
		spotLight.shadow.mapSize.height = 2048;
		this.scene.add(spotLight);
	},
	/* 循环渲染 */
	animate: function () {
		this.sphere.rotation.y += 0.01;
		requestAnimationFrame(this.animate);
		this.renderer.render(this.scene, this.camera);
	},
	/* 场景中的内容 */
	initContent: function () {
		// 创建立方体
		var cubeGeometry = new THREE.CubeGeometry(30, 30, 30); // 立方体模型
		var cubeMaterial = new THREE.MeshLambertMaterial({
			vertexColors: THREE.FaceColors
		}); // 立方体材质,颜色为随机色
		console.log(cubeGeometry.faces, 88)
		cubeGeometry.faces.forEach(face => {
			face.color.setHex(Math.random() * 0xffffff);
		})
		var cube = new THREE.Mesh(cubeGeometry, cubeMaterial); // 创建网格实例
		cube.position.x = 10;
		cube.position.z = 80;
		cube.castShadow = true;
		// 将立方体加入场景
		this.scene.add(cube);

		// 创建球体
		var sphereGeometry = new THREE.SphereGeometry(5, 20, 20);
		var sphereMaterial = new THREE.MeshLambertMaterial({
			color: Math.random() * 0xffffff
		});
		var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		sphere.position.y = 30;
		sphere.castShadow = true;
		this.sphere = sphere;
		this.scene.add(this.sphere);

		//创建一个旋转轴中心，制造立方体围绕y轴旋转的效果
		var pivotPiont = new THREE.Object3D();
		pivotPiont.add(cube);
		this.sphere.add(pivotPiont);

		//接收阴影的平面
		var planeGeometry = new THREE.PlaneGeometry(400, 400);
		var material = new THREE.MeshLambertMaterial({
			color: 0x555555,
			side: THREE.DoubleSide
		});

		var plane = new THREE.Mesh(planeGeometry, material);
		plane.rotation.x = -Math.PI / 2;
		plane.receiveShadow = true;
		this.scene.add(plane);
	}
})

new MeshLineDemo();