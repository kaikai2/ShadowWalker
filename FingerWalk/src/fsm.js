var t4 = t4 || {};

t4.fsm = {};

t4.fsm.TransitionMap = cc.Class.extend({

	beginState: null,
	transitionMap: {},

	ctor: function(map){
		this.transitionMap = cc.clone(map);
	},


	find: function(state, event){
		if (state in this.transitionMap){
			var stateMap = this.transitionMap[state];
			if (event in stateMap){
				return stateMap[event];
			}
		}
		return null;
	},
});

/// not used yet
t4.fsm.Callback = cc.Class.extend({

	ctor: function(){

	},

	registerBegin: function(fun){

	},

	registerEnd: function(fun){

	},
	registerEvent: function(fun){

	},
	registerTransition: function(fun){

	},
});

t4.fsm.Fsm = cc.Class.extend({

	transitionMap: null,
	currentState: null,
	callback: null,

	ctor: function() {
		
	},
	init: function(tm, cb) {
		this.transitionMap = tm;
		this.callback = cb;
	},
	start: function(state){
		if (typeof state == "string"){
			this.currentState = state;
		}else{
			this.currentState = this.transitionMap.beginState;
		}
	},
	getCurrentState: function(){
		return this.currentState;
	},

	response: function(event){
		var toState = this.transitionMap.find(this.currentState, event);
		if (toState !== null){
			this.jump(toState, event);
		}
	},

	_call: function(name){
		if (name in this){
			this[name].apply(this);
		}
	},
	jump: function(to, event){
		this._call('onStateEnd_' + this.currentState);
		this.currentState = to;	
		this._call('onStateBegin_' + this.currentState);
	},

});