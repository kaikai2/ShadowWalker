"restrict mode";

/*
@namespace
*/

var sw = sw || {};


sw.MapObjTypes = {
	None: 0,
	Block: 1,
	Sensor: 2,
	// ...
};
/*
MapObj 用来表示地图上的基本单元。
*/
sw.MapObj = cc.Class.extend({
	// --
	sprite: null,
	pos: null,
	mapType: sw.MapObjTypes.None,
	ctor: function(type){
		this.mapType = type || sw.MapObjTypes.None;
		this.sprite = cc.Sprite.createWithSpriteFrameName('BrickLargeSpecial0094_1_preview.png');
        this.sprite.setAnchorPoint(cc.p(0,0));
        this.sprite.setRotation(cc.RANDOM_0_1() * 360);
		this.pos = cc.p( cc.RANDOM_0_1() * 600,  cc.RANDOM_0_1() * 400);
	},

	addTo: function(ccLayer){
		ccLayer.addChild(this.sprite, 1);
		this.sprite.setPosition(this.pos);
	},

});

sw.MapObj.create = function(type){
	return new sw.MapObj(type);
};
/*
MapManager 是管理地图的容器
*/

sw.MapManager = cc.Class.extend({
	objs: [],
	layer: null,

	ctor: function(){

	},

	initScene: function(ccLayer){
		this.layer = ccLayer;
	},

	add: function(obj){
		this.objs.push(obj);
	},

	remove: function(obj){
		var index = this.objs.indexOf(obj);
		if (index != -1){
			var last = this.objs.length - 1;
			this.objs[index] = this.objs[last];
			this.objs.length = last;
		}

	},

	syncScene: function(){
		for (var i = 0; i < this.objs.length; ++i){
			this.objs[i].addTo(this.layer);
		}
	},

});
/*
SceneObject 所有游戏内活动对象的基类
*/
sw.SceneObject = cc.Class.extend({

});
/*
SceneManager 游戏内对象的管理器（当前活动场景需要一个场景管理器）
*/
sw.SceneManager = cc.Class.extend({

	ctor: function(){

	},
});
