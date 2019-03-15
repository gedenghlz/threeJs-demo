import 'three/examples/js/controls/OrbitControls';

// import {
// 	MeshLine,
// 	MeshLineMaterial
// // } from 'three.meshline';
import DragControls from '../../lib/js/THREE.DragControls';
import 'three/examples/js/libs/dat.gui.min.js';
import 'three/examples/js/libs/tween.min.js';


var THREEChart = function () {
	this.nodes = [];
	this.edges = [];
	this.myCanvas = document.getElementById('canvas-frame');
	this.width = this.myCanvas.clientWidth;
	this.height = this.myCanvas.clientHeight;
	this.renderer = null;
	this.camera = null;
	this.controls = null;
	this.scene = null;
	this.elements = null;
	this.font = null;
	this.gltf = null;
	this.mouseX = this.width / 2;
	this.mouseY = this.height / 2;
	this.edgeGroupObject = []
	this.init();
}

THREEChart.prototype = {

	init: function () {

		var self = this;
		self.start();
	},
	// 添加拖拽控件
	initDragControls: function () {
		var self = this;
		// 过滤不是 Mesh 的物体,例如辅助网格对象
		var objects = [];
		for (let i = 0; i < self.scene.children.length; i++) {
			var child = self.scene.children[i];
			if (child.isMesh) {
				objects.push(child);
			} else if (child.children.length > 0) {
				objects = objects.concat(child.children)

			}
		}
		new DragControls(objects, self.camera, self.renderer.domElement, (selected) => {
			var selectedEdges = self.edgeGroupObject.filter((item) => {
				return item.indexOf(selected.name) >= 0
			})
			selectedEdges.forEach(name => {
				self.scene.remove(self.scene.getObjectByName(name));
				self.scene.remove(self.scene.getObjectByName(name + 'text'));
				self.scene.remove(self.scene.getObjectByName(selected.name + 'text'));


				self.drawText({
					id: selected.name,
					message: selected.message,
					color: selected.xk ? 0xc23531 : 0xff0000,
					x: selected.position.x,
					y: selected.position.y,
					z: selected.position.z
				});
				self.drawEdge(self.edges[name]);
			})

		}, self.controls);
	},


	start: function () {
		var self = this;
		// 只要有一个资源没加载完就直接返回，不执行


		self.nodes = [{
			id: 'n1',
			name: '某某石化有限公司',
			xk: true,
			level: 'center',
			pos: [0, 0, 0] // 中心节点的z为坐标原点
		}, {
			id: 'n2',
			name: '**能源有限公司',
			level: 'sy-1',
			pos: [-400, 600]
		}, {
			id: 'n3',
			name: '**石化产品有限公司',
			level: 'sy-1',
			pos: [-400, 400]
		}, {
			id: 'n4',
			name: '**化工有限公司',
			level: 'sy-1',
			pos: [-400, 200]
		}, {
			id: 'n5',
			name: '**贸易有限公司',
			level: 'sy-1',
			pos: [-400, 0]
		}, {
			id: 'n6',
			name: '**生物科技有限公司',
			level: 'sy-1',
			pos: [-400, -200]
		}, {
			id: 'n7',
			name: '**炼化有限公司',
			xk: true,
			level: 'sy-1',
			pos: [-400, -400]
		}, {
			id: 'n8',
			name: '**有限公司',
			level: 'xy-1',
			pos: [400, 500]
		}, {
			id: 'n9',
			name: '**有限公司',
			level: 'xy-1',
			pos: [400, 100]
		}, {
			id: 'n10',
			name: '**特种沥青有限公司',
			level: 'xy-1',
			pos: [400, -400]
		}, {
			id: 'n11',
			name: '**A石化有限公司',
			level: 'sy-2',
			pos: [-800, 500]
		}, {
			id: 'n12',
			name: '**B石化有限公司',
			level: 'sy-2',
			pos: [-800, 100]
		}, {
			id: 'n13',
			name: '**C石化有限公司',
			level: 'sy-2',
			pos: [-800, -100]
		}, {
			id: 'n14',
			name: '**D石化有限公司',
			level: 'sy-2',
			pos: [-800, -500]
		}, {
			id: 'n15',
			name: '**有限公司',
			level: 'xy-2',
			pos: [800, 600]
		}, {
			id: 'n16',
			name: '**有限公司',
			level: 'xy-2',
			pos: [800, 400]
		}, {
			id: 'n17',
			name: '**有限公司',
			level: 'xy-2',
			pos: [800, 200]
		}, {
			id: 'n18',
			name: '**有限公司',
			level: 'xy-2',
			pos: [800, 0]
		}, {
			id: 'n19',
			name: '**有限公司',
			level: 'xy-2',
			pos: [800, -200]
		}, {
			id: 'n20',
			name: '**有限公司',
			level: 'xy-2',
			pos: [800, -400]
		}, {
			id: 'n21',
			name: '**有限公司',
			level: 'xy-2',
			pos: [800, -600]
		}];
		self.edges = {
			'n2-n1': {
				id: 'n2-n1',
				source: 'n2',
				target: 'n1',
				jyje: '12.5亿'
			},
			'n3-n1': {
				id: 'n3-n1',
				source: 'n3',
				target: 'n1',
				jyje: '44.1亿'
			},
			'n4-n1': {
				id: 'n4-n1',
				source: 'n4',
				target: 'n1',
				jyje: '39.2亿'
			},
			'n5-n1': {
				id: 'n5-n1',
				source: 'n5',
				target: 'n1',
				jyje: '9.9亿'
			},
			'n6-n1': {
				id: 'n6-n1',
				source: 'n6',
				target: 'n1',
				jyje: '24.5亿'
			},
			'n7-n1': {
				id: 'n7-n1',
				source: 'n7',
				target: 'n1',
				jyje: '1.2亿'
			},
			'n1-n8': {
				id: 'n1-n8',
				source: 'n1',
				target: 'n8',
				jyje: '2.3亿'
			},
			'n1-n9': {
				id: 'n1-n9',
				source: 'n1',
				target: 'n9',
				jyje: '1.1亿'
			},
			'n1-n10': {
				id: 'n1-n10',
				source: 'n1',
				target: 'n10',
				jyje: '73.1亿'
			},
			'n11-n2': {
				id: 'n11-n2',
				source: 'n11',
				target: 'n2',
				jyje: '2.2亿'
			},
			'n11-n3': {
				id: 'n11-n3',
				source: 'n11',
				target: 'n3',
				jyje: '23亿'
			},
			'n11-n4': {
				id: 'n11-n4',
				source: 'n11',
				target: 'n4',
				jyje: '13.9亿'
			},
			'n11-n5': {
				id: 'n11-n5',
				source: 'n11',
				target: 'n5',
				jyje: '8亿'
			},
			'n7-n10': {
				id: 'n7-n10',
				source: 'n7',
				target: 'n10',
				jyje: '12亿'
			},
			'n7-n11': {
				id: 'n7-n11',
				source: 'n7',
				target: 'n11',
				jyje: '41.3亿'
			},
			'n12-n2': {
				id: 'n12-n2',
				source: 'n12',
				target: 'n2',
				jyje: '4亿'
			},
			'n12-n3': {
				id: 'n12-n3',
				source: 'n12',
				target: 'n3',
				jyje: '5.3亿'
			},
			'n12-n4': {
				id: 'n12-n4',
				source: 'n12',
				target: 'n4',
				jyje: '5.1亿'
			},
			'n12-n5': {
				id: 'n12-n5',
				source: 'n12',
				target: 'n5',
				jyje: '1.7亿'
			},
			'n12-n6': {
				id: 'n12-n6',
				source: 'n12',
				target: 'n6',
				jyje: '11.1亿'
			},
			'n7-n12': {
				id: 'n7-n12',
				source: 'n7',
				target: 'n12',
				jyje: '11.8亿'
			},
			'n7-n13': {
				id: 'n7-n13',
				source: 'n7',
				target: 'n13',
				jyje: '4.1亿'
			},
			'n7-n14': {
				id: 'n7-n14',
				source: 'n7',
				target: 'n14',
				jyje: '4.3亿'
			},
			'n8-n15': {
				id: 'n8-n15',
				source: 'n8',
				target: 'n15',
				jyje: '1亿'
			},
			'n8-n16': {
				id: 'n8-n16',
				source: 'n8',
				target: 'n16',
				jyje: '1亿'
			},
			'n9-n17': {
				id: 'n9-n17',
				source: 'n9',
				target: 'n17',
				jyje: '1亿'
			},
			'n9-n18': {
				id: 'n9-n18',
				source: 'n9',
				target: 'n18',
				jyje: '1亿'
			},
			'n10-n7': {
				id: 'n10-n7',
				source: 'n10',
				target: 'n7',
				jyje: '17.6亿'
			},
			'n10-n19': {
				id: 'n10-n19',
				source: 'n10',
				target: 'n19',
				jyje: '1亿'
			},
			'n10-n20': {
				id: 'n10-n20',
				source: 'n10',
				target: 'n20',
				jyje: '1亿'
			},
			'n10-n21': {
				id: 'n10-n21',
				source: 'n10',
				target: 'n21',
				jyje: '1亿'
			}
		};

		// init three
		self.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});
		self.renderer.setSize(self.width, self.height);
		document.getElementById('canvas-frame').appendChild(self.renderer.domElement);

		// initCamera
		// 设置相机可看到的远截面有2000的距离，相机的z有1000，则场景中的元素的z大于-1000的都能被看到
		self.camera = new THREE.PerspectiveCamera(45, self.width / self.height, 0.1, 20000);
		self.camera.position.z = 800;
		self.camera.position.y = 0;
		self.camera.position.x = 0;
		self.camera.lookAt(0, 0, 0);



		self.controls = new THREE.OrbitControls(self.camera);
		self.controls.minDistance = 100;
		self.controls.maxDistance = 5000;
		self.controls.update();

		// initScene
		self.scene = new THREE.Scene();



		// initLight
		// var light1 = new THREE.AmbientLight(0xF0F0F0, 1.5);
		// light1.position.set(0, 0, 500 ).normalize();
		// self.scene.add(light1);
		var light2 = new THREE.DirectionalLight(0xFFFFFF, 0.3);
		light2.position.set(-100, 100, 20);

		self.scene.add(light2);
		var ambientLight = new THREE.AmbientLight(0xffffff);
		self.scene.add(ambientLight);











		// 画点
		for (var i = 0; i < self.nodes.length; i++) {
			var node = self.nodes[i];
			self.drawNode(node);
		}
		// 画线
		for (var i in self.edges) {
			var edge = self.edges[i];
			self.edgeGroupObject.push(edge.id);
			self.drawEdge(edge);
		}


		// render
		self.render();

		// event register
		self.registerEvent();

		self.initDragControls();
	},
	/**
	 * 画点
	 * @param node
	 */
	drawNode: function (node) {
		var self = this;
		var geometry4Node = new THREE.SphereGeometry(15, 80, 80);
		var mColor = '#fff';
		if (node.level == 'center') {
			mColor = '#da5e5a';
		} else if (node.level == 'sy-1') {
			mColor = '#DE9325';
		} else if (node.level == 'xy-1') {
			mColor = '#d48265';
		} else if (node.level == 'sy-2') {
			mColor = '#61a0a8';
		} else if (node.level == 'xy-2') {
			mColor = '#91c7ae';
		}
		var newBall = null;
		if (node.type === 1) {
			// 加入人形
			var material = new THREE.MeshLambertMaterial({
				color: 0x6a7ecf,
				side: THREE.DoubleSide
			});
			newBall = new THREE.Mesh(self.gltf.scene.children[0].geometry, material);
			newBall.scale.set(10, 10, 10);
		} else {
			var basicMaterial4Node = new THREE.MeshPhongMaterial({
				color: mColor
			});
			newBall = new THREE.Mesh(geometry4Node, basicMaterial4Node);
		}

		// 自定义数据存放
		newBall.userData.id = node.id;
		newBall.userData.name = node.name;
		// 设置位置
		newBall.name = node.id; // 用于后面根据name查询节点
		newBall.message = node.name
		newBall.position.x = node.pos[0] / 2;
		newBall.position.y = node.pos[1] / 2;
		if (node.pos && node.pos[2] != undefined) { // 如果有预设的z坐标，则直接使用预设的z
			newBall.position.z = node.pos[2] / 2;
		} else {
			newBall.position.z = (600 - Math.random() * 1200) / 2;
		}

		var labelColor = node.xk ? 0xc23531 : 0xff0000;

		var text = self.drawText({
			id: node.id,
			message: node.name,
			color: labelColor,
			x: newBall.position.x,
			y: newBall.position.y,
			z: newBall.position.z
		});

		var node_G = new THREE.Group();
		node_G.name = node.id + '_G';
		node_G.add(newBall);
		// node_G.add(text);
		self.scene.add(node_G);
	},
	/**
	 * 画线
	 * @param edge
	 */
	drawEdge: function (edge) {
		var self = this;
		var geometry4Edge = new THREE.Geometry();
		var basicMaterial4Edge = new MeshLineMaterial({
			color: new THREE.Color(0x999999),
			sizeAttenuation: false,
			// 线宽
			lineWidth: 0.0014,
			// 摄像机近剪裁平面距离,跟随相机(sizeAttenuation为false时必须设置)
			near: self.camera.near,
			// 相机远剪裁平面距离,跟随相机(sizeAttenuation为false时必须设置)
			far: self.camera.far,
		});
		var sourceBall = self.scene.getObjectByName(edge.source);
		var targetBall = self.scene.getObjectByName(edge.target);
		var line = new MeshLine();
		if (sourceBall && targetBall) {
			geometry4Edge.vertices.push(new THREE.Vector3(sourceBall.position.x, sourceBall.position.y, sourceBall.position.z));
			geometry4Edge.vertices.push(new THREE.Vector3(targetBall.position.x, targetBall.position.y, targetBall.position.z));
			line.setGeometry(geometry4Edge);
			var mesh = new THREE.Mesh(line.geometry, basicMaterial4Edge); // this syntax could definitely be improved!
			mesh.name = edge.id; // 用于后面根据name查询节点





			mesh.userData.lineType = edge.jyje ? 'jy' : 'rz'; // 当前边的属性是交易边还是人员任职边
			var text = self.drawText({
				id: edge.id,
				message: edge.jyje ? edge.jyje : edge.rzgw,
				x: (sourceBall.position.x + targetBall.position.x) / 2,
				y: (sourceBall.position.y + targetBall.position.y) / 2,
				z: (sourceBall.position.z + targetBall.position.z) / 2
			});
			var edge_G = new THREE.Group();
			edge_G.name = edge.id + '_G';
			edge_G.add(mesh);
			console.log(mesh)
			// edge_G.add(text);
			self.scene.add(mesh);
		}
	},
	/**
	 * 画文字
	 * @param param
	 */
	drawText: function (param) {
		var self = this;
		// 设置默认值
		var color = param.color || new THREE.Color("rgba(255,0,0)");
		var fontSize = param.fontSize || 20;
		var posX = param.x || 0;
		var posY = param.y || 0;
		var posZ = param.z || 0;

		var spriteOrign = self.makeTextSprite(param.message, {
			fontsize: 40,
			borderColor: {
				r: 255,
				g: 0,
				b: 0,
				a: 0.4
			},
			/* 边框黑色 */
			backgroundColor: {
				r: 255,
				g: 255,
				b: 255,
				a: 0.9
			} /* 背景颜色 */
		})

		spriteOrign.center = new THREE.Vector2(0, 0);
		spriteOrign.name = param.id + 'text'
		self.scene.add(spriteOrign);
		spriteOrign.position.set(posX - 10, posY - 70, posZ)

		return spriteOrign;
	},
	/**
	 * 渲染
	 */
	render: function () {
		var self = this;
		/*self.camera.position.x += ( self.mouseX - self.camera.position.x ) * 0.02;
		self.camera.position.y += ( - self.mouseY + 200 - self.camera.position.y ) * 0.02;
		self.camera.lookAt( self.scene.position );*/
		//self.scene.rotation.y += 0.01;
		requestAnimationFrame(self.render.bind(self));
		self.renderer.render(self.scene, self.camera);
	},
	/***
	 * 增加元素
	 */
	addObjects: function (addEles) {
		var addNodes = addEles.addNodes;
		var addEdges = addEles.addEdges;
		// 画点
		for (var i = 0; i < addNodes.length; i++) {
			var node = addNodes[i];
			this.drawNode(node);
		}
		// 画线
		for (var i = 0; i < addEdges.length; i++) {
			var edge = addEdges[i];
			this.drawEdge(edge);
		}


	},
	/***
	 * 更新label文本
	 */
	updateLabels: function (eleId, newParam) {
		var eleGroup = this.scene.getObjectByName(eleId + '_G');
		var eleLabel = this.scene.getObjectByName(eleId + '_Label');
		eleGroup.remove(eleLabel);
		var newLabel = this.drawText({
			id: eleId,
			message: newParam.message,
			color: newParam.color,
			x: eleLabel.position.x,
			y: eleLabel.position.y + 60, // 因为在正式生成文字mesh的时候(drawText)会减60
			z: eleLabel.position.z
		});
		// eleGroup.add(newLabel);
	},
	/**
	 * 元素淡出视图
	 */
	fadeOutObjects: function (delIds) {
		var self = this;
		delIds.forEach(function (name) {
			self.scene.remove(self.scene.getObjectByName(name));
		});
	},
	/**
	 * 注册事件
	 */
	registerEvent: function () {
		var self = this;
		var windowHalfX = self.width / 2;
		var windowHalfY = self.height / 2;
		self.myCanvas.addEventListener('mousemove', function (event) {
			self.mouseX = event.clientX - windowHalfX;
			self.mouseY = event.clientY - windowHalfY;
		}, false);

		self.myCanvas.addEventListener('touchstart', function (event) {
			if (event.touches.length > 1) {
				event.preventDefault();
				self.mouseX = event.touches[0].pageX - windowHalfX;
				self.mouseY = event.touches[0].pageY - windowHalfY;
			}
		}, false);

		self.myCanvas.addEventListener('touchmove', function (event) {
			if (event.touches.length == 1) {
				event.preventDefault();
				self.mouseX = event.touches[0].pageX - windowHalfX;
				self.mouseY = event.touches[0].pageY - windowHalfY;
			}
		}, false);
	},


	/* 创建字体精灵 */
	makeTextSprite: function (message, parameters) {
		if (parameters === undefined) parameters = {};

		let fontface = parameters.hasOwnProperty("fontface") ?
			parameters["fontface"] : "Arial";

		/* 字体大小 */
		let fontsize = parameters.hasOwnProperty("fontsize") ?
			parameters["fontsize"] : 18;

		/* 边框厚度 */
		let borderThickness = parameters.hasOwnProperty("borderThickness") ?
			parameters["borderThickness"] : 4;

		/* 边框颜色 */
		let borderColor = parameters.hasOwnProperty("borderColor") ?
			parameters["borderColor"] : {
				r: 0,
				g: 0,
				b: 0,
				a: 1.0
			};

		/* 背景颜色 */
		let backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
			parameters["backgroundColor"] : {
				r: 255,
				g: 255,
				b: 255,
				a: 1.0
			};

		/* 创建画布 */
		let canvas = document.createElement('canvas');

		canvas.width = 400
		canvas.height = 200
		let context = canvas.getContext('2d');

		/* 字体加粗 */
		context.font = "Bold " + fontsize + "px " + fontface;

		/* 获取文字的大小数据，高度取决于文字的大小 */
		let metrics = context.measureText(message);
		let textWidth = metrics.width;

		/* 背景颜色 */
		context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," +
			backgroundColor.b + "," + backgroundColor.a + ")";

		/* 边框的颜色 */
		context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," +
			borderColor.b + "," + borderColor.a + ")";
		context.lineWidth = borderThickness;


		/* 字体颜色 */
		context.fillStyle = "rgba(0, 0, 0, 1.0)";
		context.fillText(message, borderThickness, fontsize + borderThickness);



		/* 画布内容用于纹理贴图 */
		let texture = new THREE.Texture(canvas);

		texture.needsUpdate = true;

		let spriteMaterial = new THREE.SpriteMaterial({
			map: texture,
		});
		let sprite = new THREE.Sprite(spriteMaterial);


		/* 缩放比例 */
		sprite.scale.set(100, 50, 1);

		return sprite;


	},
}


var threeChart = new THREEChart();