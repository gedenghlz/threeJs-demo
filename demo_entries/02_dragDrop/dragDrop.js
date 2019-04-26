import 'three/examples/js/controls/OrbitControls';
import 'three-onevent';
import DragControls from '../../lib/js/THREE.DragControls';
import 'three/examples/js/libs/dat.gui.min.js';
import TWEEN from '@tweenjs/tween.js';



var THREEChart = function () {
	this.nodes = [];
	this.edges = [];
	this.sprites = [];
	this.visibleEles = [];
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
		this.allSceneChild = objects;
		new DragControls(objects, self.camera, self.renderer.domElement, (selected) => {
			var selectedEdges = self.getNodeLines(selected.name);
			selectedEdges.forEach(name => {
				var line = self.scene.getObjectByName(name)
				var pArr = line.geometry.vertices;
				line.geometry.verticesNeedUpdate = true;

				var text = self.scene.getObjectByName(name + 'text');
				var tP = text.position

				if (name.startsWith(selected.name)) {
					tP.x = tP.x + (selected.position.x - pArr[0].x) / 2
					tP.y = tP.y + (selected.position.y - pArr[0].y) / 2
					tP.z = tP.z + (selected.position.z - pArr[0].z) / 2
					pArr[0] = new THREE.Vector3(selected.position.x, selected.position.y, selected.position.z)
				} else {
					tP.x = tP.x + (selected.position.x - pArr[1].x) / 2
					tP.y = tP.y + (selected.position.y - pArr[1].y) / 2
					tP.z = tP.z + (selected.position.z - pArr[1].z) / 2
					pArr[1] = new THREE.Vector3(selected.position.x, selected.position.y, selected.position.z)
				}

				var nT = self.scene.getObjectByName(selected.name + 'text');
				nT.position.x = selected.position.x - 10;
				nT.position.y = selected.position.y - 70;
				nT.position.z = selected.position.z;


			})

		}, self.controls);
	},


	getNodeLines: function (name) {
		return this.edgeGroupObject.filter((item) => {
			return item.startsWith(name + '-') || item.endsWith('-' + name)
		})
	},

	start: function () {
		var self = this;
		// 只要有一个资源没加载完就直接返回，不执行


		self.nodes = [{
			id: 'n1',
			name: '某某石化',
			xk: true,
			level: 'center',
			pos: [0, 0, 0] // 中心节点的z为坐标原点
		}, {
			id: 'n2',
			name: '**能源',
			level: 'sy-1',
			pos: [-400, 600]
		}, {
			id: 'n3',
			name: '**石化产品',
			level: 'sy-1',
			pos: [-400, 400]
		}, {
			id: 'n4',
			name: '**化工',
			level: 'sy-1',
			pos: [-400, 200]
		}, {
			id: 'n5',
			name: '**贸易',
			level: 'sy-1',
			pos: [-400, 0]
		}, {
			id: 'n6',
			name: '**生物科技',
			level: 'sy-1',
			pos: [-400, -200]
		}, {
			id: 'n7',
			name: '**炼化',
			xk: true,
			level: 'sy-1',
			pos: [-400, -400]
		}, {
			id: 'n8',
			name: '**',
			level: 'xy-1',
			pos: [400, 500]
		}, {
			id: 'n9',
			name: '**',
			level: 'xy-1',
			pos: [400, 100]
		}, {
			id: 'n10',
			name: '**特种沥青',
			level: 'xy-1',
			pos: [400, -400]
		}, {
			id: 'n11',
			name: '**A石化',
			level: 'sy-2',
			pos: [-800, 500]
		}, {
			id: 'n12',
			name: '**B石化',
			level: 'sy-2',
			pos: [-800, 100]
		}, {
			id: 'n13',
			name: '**C石化',
			level: 'sy-2',
			pos: [-800, -100]
		}, {
			id: 'n14',
			name: '**D石化',
			level: 'sy-2',
			pos: [-800, -500]
		}, {
			id: 'n15',
			name: '**',
			level: 'xy-2',
			pos: [800, 600]
		}, {
			id: 'n16',
			name: '**',
			level: 'xy-2',
			pos: [800, 400]
		}, {
			id: 'n17',
			name: '**',
			level: 'xy-2',
			pos: [800, 200]
		}, {
			id: 'n18',
			name: '**',
			level: 'xy-2',
			pos: [800, 0]
		}, {
			id: 'n19',
			name: '**',
			level: 'xy-2',
			pos: [800, -200]
		}, {
			id: 'n20',
			name: '**',
			level: 'xy-2',
			pos: [800, -400]
		}, {
			id: 'n21',
			name: '**',
			level: 'xy-2',
			pos: [800, -600]
		}];
		self.edges = {
			'n2-n1': {
				id: 'n2-n1',
				source: 'n2',
				target: 'n1',
				jyje: '12.5'
			},
			'n3-n1': {
				id: 'n3-n1',
				source: 'n3',
				target: 'n1',
				jyje: '44.1'
			},
			'n4-n1': {
				id: 'n4-n1',
				source: 'n4',
				target: 'n1',
				jyje: '39.2'
			},
			'n5-n1': {
				id: 'n5-n1',
				source: 'n5',
				target: 'n1',
				jyje: '9.9'
			},
			'n6-n1': {
				id: 'n6-n1',
				source: 'n6',
				target: 'n1',
				jyje: '24.5'
			},
			'n7-n1': {
				id: 'n7-n1',
				source: 'n7',
				target: 'n1',
				jyje: '1.2'
			},
			'n1-n8': {
				id: 'n1-n8',
				source: 'n1',
				target: 'n8',
				jyje: '2.3'
			},
			'n1-n9': {
				id: 'n1-n9',
				source: 'n1',
				target: 'n9',
				jyje: '1.1'
			},
			'n1-n10': {
				id: 'n1-n10',
				source: 'n1',
				target: 'n10',
				jyje: '73.1'
			},
			'n11-n2': {
				id: 'n11-n2',
				source: 'n11',
				target: 'n2',
				jyje: '2.2'
			},
			'n11-n3': {
				id: 'n11-n3',
				source: 'n11',
				target: 'n3',
				jyje: '23'
			},
			'n11-n4': {
				id: 'n11-n4',
				source: 'n11',
				target: 'n4',
				jyje: '13.9'
			},
			'n11-n5': {
				id: 'n11-n5',
				source: 'n11',
				target: 'n5',
				jyje: '8'
			},
			'n7-n10': {
				id: 'n7-n10',
				source: 'n7',
				target: 'n10',
				jyje: '12'
			},
			'n7-n11': {
				id: 'n7-n11',
				source: 'n7',
				target: 'n11',
				jyje: '41.3'
			},
			'n12-n2': {
				id: 'n12-n2',
				source: 'n12',
				target: 'n2',
				jyje: '4'
			},
			'n12-n3': {
				id: 'n12-n3',
				source: 'n12',
				target: 'n3',
				jyje: '5.3'
			},
			'n12-n4': {
				id: 'n12-n4',
				source: 'n12',
				target: 'n4',
				jyje: '5.1'
			},
			'n12-n5': {
				id: 'n12-n5',
				source: 'n12',
				target: 'n5',
				jyje: '1.7'
			},
			'n12-n6': {
				id: 'n12-n6',
				source: 'n12',
				target: 'n6',
				jyje: '11.1'
			},
			'n7-n12': {
				id: 'n7-n12',
				source: 'n7',
				target: 'n12',
				jyje: '11.8'
			},
			'n7-n13': {
				id: 'n7-n13',
				source: 'n7',
				target: 'n13',
				jyje: '4.1'
			},
			'n7-n14': {
				id: 'n7-n14',
				source: 'n7',
				target: 'n14',
				jyje: '4.3'
			},
			'n8-n15': {
				id: 'n8-n15',
				source: 'n8',
				target: 'n15',
				jyje: '1'
			},
			'n8-n16': {
				id: 'n8-n16',
				source: 'n8',
				target: 'n16',
				jyje: '1'
			},
			'n9-n17': {
				id: 'n9-n17',
				source: 'n9',
				target: 'n17',
				jyje: '1'
			},
			'n9-n18': {
				id: 'n9-n18',
				source: 'n9',
				target: 'n18',
				jyje: '1'
			},
			'n10-n7': {
				id: 'n10-n7',
				source: 'n10',
				target: 'n7',
				jyje: '17.6'
			},
			'n10-n19': {
				id: 'n10-n19',
				source: 'n10',
				target: 'n19',
				jyje: '1'
			},
			'n10-n20': {
				id: 'n10-n20',
				source: 'n10',
				target: 'n20',
				jyje: '1'
			},
			'n10-n21': {
				id: 'n10-n21',
				source: 'n10',
				target: 'n21',
				jyje: '1'
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
		self.camera = new THREE.PerspectiveCamera(30, self.width / self.height, 0.1, 20000);
		// self.camera = new THREE.OrthographicCamera(self.width / - 2, self.width / 2, self.height / 2, self.height / - 2, 0.1, 20000);
		self.camera.position.z = 1200;
		self.camera.position.y = 0;
		self.camera.position.x = 0;
		self.camera.lookAt(0, 0, 0);



		self.controls = new THREE.OrbitControls(self.camera);
		self.controls.minDistance = 100;
		self.controls.maxDistance = 5000;
		self.controls.autoRotate = true;

		self.scene = new THREE.Scene();



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

		self.initDragControls();
		self.registerEvent();

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

		var sourceBall = self.scene.getObjectByName(edge.source);
		var targetBall = self.scene.getObjectByName(edge.target);

		if (sourceBall && targetBall) {
			geometry4Edge.vertices.push(new THREE.Vector3(sourceBall.position.x, sourceBall.position.y, sourceBall.position.z));
			geometry4Edge.vertices.push(new THREE.Vector3(targetBall.position.x, targetBall.position.y, targetBall.position.z));
			geometry4Edge.colors.push(sourceBall.material.color, targetBall.material.color)
			var mesh = new THREE.Line(geometry4Edge, new THREE.LineBasicMaterial({
				vertexColors: true
			})); // this syntax could definitely be improved!
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
		spriteOrign.visible = false
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
		console.log(TWEEN,77)
		TWEEN.update();
		self.controls.update();
		self.renderer.render(self.scene, self.camera);
		self.threeOnEvent = new THREE.onEvent(self.scene, self.camera);
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

		this.allSceneChild.forEach(item => {
			item.on('click', function (e) {
				var vertices = e.geometry.vertices;
				console.log(vertices, 9)
				e.visible = false;
				self.visibleEles.push(e);
				var nodeMar = new THREE.SpriteMaterial({
					color: e.material.color,
					sizeAttenuation: false
				})
				let nodeGroup = new THREE.Group()
				vertices.forEach((vertice, index) => {
					if (index % 10 === 0) {
						var sprite = new THREE.Sprite(nodeMar);
						sprite.position1 = Object.assign({}, e.position);
						sprite.position2 = Object.assign({}, e.position);
						sprite.position.set(vertice.x, vertice.y, vertice.z);
						sprite.scale.set(0.002, 0.002, 0.002)
						nodeGroup.add(sprite)
						self.sprites.push(sprite);
						new TWEEN.Tween(sprite.position1)
							.to({
								x: sprite.position1.x + (2000 - Math.random() * 4000),
								y: sprite.position1.y + (2000 - Math.random() * 4000),
								z: sprite.position1.z + (2000 - Math.random() * 4000)
							}, 5000)
							.onUpdate(() => {
								sprite.position.set(sprite.position1.x, sprite.position1.y, sprite.position1.z)
							})
							.start();
					}
				})

				self.scene.add(nodeGroup);

				var lines = self.getNodeLines(e.name);
				var group = new THREE.Group();

				lines.forEach(line => {
					var curLine = self.scene.getObjectByName(line)
					if (curLine.visible === true) {
						var vertices = curLine.geometry.vertices;

						var lineMar1 = new THREE.SpriteMaterial({
							color: curLine.geometry.colors[0],
							sizeAttenuation: false
						})
						var lineMar2 = new THREE.SpriteMaterial({
							color: curLine.geometry.colors[1],
							sizeAttenuation: false
						})
						var vertice1 = vertices[0];
						var vertice2 = vertices[1];

						var sum = Math.floor(Math.abs(vertice1.x + vertice1.y + vertice1.z - (vertice2.x + vertice2.y + vertice2.z)))
						var x1x2 = (vertice2.x - vertice1.x) / sum;
						var y1y2 = (vertice2.y - vertice1.y) / sum;
						var z1z2 = (vertice2.z - vertice1.z) / sum;
						for (var i = 0; i < sum; i++) {
							var sprite = new THREE.Sprite(i < sum / 2 ? lineMar1 : lineMar2);
							var object1 = {
								x: vertice1.x + x1x2 * i,
								y: vertice1.y + y1y2 * i,
								z: vertice1.z + z1z2 * i
							}
							sprite.position.set(object1.x, object1.y, object1.z);
							sprite.position2 = Object.assign({}, object1)
							sprite.scale.set(0.002, 0.002, 0.002)
							group.add(sprite)
							self.sprites.push(sprite);
						}
						curLine.visible = false;
						self.visibleEles.push(curLine);
					}

				})
				self.scene.add(group)

				group.children.forEach(item => {
					var position = item.position;
					new TWEEN.Tween(position)
						.to({
							x: position.x + (2000 - Math.random() * 4000),
							y: position.y + (2000 - Math.random() * 4000),
							z: position.z + (2000 - Math.random() * 4000)
						}, 5000)
						.onUpdate(() => {
							item.position.set(position.x, position.y, position.z);
						})
						.start();
				})
			})

		})

		document.getElementById('restoreBtn').addEventListener('click',()=>{
			self.restoreSprite();
		})

	},

	restoreSprite() {
		let self = this;
		this.sprites.forEach(sprite => {
			let position = sprite.position;
			let position2 = sprite.position2;
			let animateP = Object.assign({},position);
			new TWEEN.Tween(animateP)
				.to({
					x: position2.x,
					y: position2.y,
					z: position2.z
				}, 5000)
				.onUpdate(() => {
					sprite.position.set(animateP.x, animateP.y, animateP.z);
				})
				.start()
				.onComplete(()=>{
					sprite.visible = false
				})
		})
		setTimeout(()=>{
			self.visibleEles.forEach(ele=>{
				ele.visible = true;
			})
			self.visibleEles = [];
		},5000)

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