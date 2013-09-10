var t4 = t4 || {};

t4.KeyDir = {
	Left: 'Left',
	Right: 'Right',
	Up: 'Up',
	Down: 'Down',
};
t4.ControlDir = {
	Left: 'Left',
	Right: 'Right',
	Up: 'Up',
	Down: 'Down',
	LeftUp: 'LeftUp',
	RightUp: 'RightUp',
	LeftDown: 'LeftDown',
	RightDown: 'RightDown',
};

t4.KeyboardTransitionMap = {
	'Normal':{
		'PressLeft': 'Left',
		'PressRight': 'Right',
		'PressUp': 'Up',
		'PressDown': 'Down',
	},
	'Left':{
		'ReleaseLeft': 'Normal',
		'PressRight': 'Right',
		'PressUp': 'LeftUp',
		'PressDown': 'LeftDown',
	},
	'Right':{
		'PressLeft': 'Left',
		'ReleaseRight': 'Normal',
		'PressUp': 'RightUp',
		'PressDown': 'RightDown',
	},
	'Up':{
		'PressLeft': 'LeftUp',
		'PressRight': 'RightUp',
		'ReleaseUp': 'Normal',
		'PressDown': 'Down',
	},
	'Down':{
		'PressLeft': 'LeftDown',
		'PressRight': 'RightDown',
		'PressUp': 'Up',
		'ReleaseDown': 'Normal',
	},
	'LeftUp':{
		'ReleaseLeft': 'Up',
		'PressRight': 'RightUp',
		'ReleaseUp': 'Left',
		'PressDown': 'LeftDown',
	},
	'RightUp':{
		'PressLeft': 'LeftUp',
		'ReleaseRight': 'Up',
		'ReleaseUp': 'Right',
		'PressDown': 'RightDown',
	},
	'LeftDown':{
		'ReleaseLeft': 'Down',
		'PressRight': 'RightDown',
		'PressUp': 'LeftUp',
		'ReleaseDown': 'Left',
	},
	'RightDown':{
		'PressLeft': 'LeftDown',
		'ReleaseRight': 'Down',
		'PressUp': 'RightUp',
		'ReleaseDown': 'Right',
	},
};

t4.KeyboardController = cc.Class.extend({
	keyMap: {},
	ctor: function(sink){
		var tm = new t4.fsm.TransitionMap(t4.KeyboardTransitionMap);
		this.sink = sink;
		this.cb = new t4.fsm.Callback(this);
		this.fsm = new t4.fsm.Fsm(tm, this.cb);

		this.cb.registerEnd('Normal', this.onStartMove);
		this.cb.registerBegin('Normal', this.onStopMove);
		this.cb.registerBegin('Left', this.onTurnLeft);
		this.cb.registerBegin('LeftUp', this.onTurnLeft);
		this.cb.registerBegin('LeftDown', this.onTurnLeft);
		this.cb.registerBegin('Right', this.onTurnRight);
		this.cb.registerBegin('RightUp', this.onTurnRight);
		this.cb.registerBegin('RightDown', this.onTurnRight);
	},

	reset: function(){
		this.keyMap = {};
	},
	bindKey: function(key, dir){
		this.keyMap[key] = dir;
	},
	start: function(){
		this.fsm.start('Normal');
	},
	get: function(){
		return this.fsm.getCurrentState();
	},

	onKeyDown: function(keyCode){
		if (keyCode in this.keyMap){
			var event = 'Press' + this.keyMap[keyCode];
			this.fsm.response(event);
		}
	},

	onKeyUp: function(keyCode){
		if (keyCode in this.keyMap){
			var event = 'Release' + this.keyMap[keyCode];
			this.fsm.response(event);
		}
	},

	onStartMove: function(state){
		if (this.sink && 'onStartMove' in this.sink){
			this.sink.onStartMove.call(this.sink, state);
		}
	},
	onStopMove: function(state){
		if (this.sink && 'onStopMove' in this.sink){
			this.sink.onStopMove.call(this.sink, state);
		}
	},
	onTurnLeft: function(state){
		if (this.sink && 'onTurnLeft' in this.sink){
			this.sink.onTurnLeft.call(this.sink, state);
		}
	},
	onTurnRight: function(state){
		if (this.sink && 'onTurnRight' in this.sink){
			this.sink.onTurnRight.call(this.sink, state);
		}
	},
});