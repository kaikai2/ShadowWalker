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
	target: null,
	stateBeginCallback: {},
	stateEndCallback: {},
	eventCallback: {},
	transitonCallbak: {},

	ctor: function(target){
		this.target = target;
	},

	registerBegin: function(state, fun){
		if (state in this.stateBeginCallback){
			this.stateBeginCallback[state].push(fun);
		}else{
			this.stateBeginCallback[state] = [fun];
		}
	},

	registerEnd: function(state, fun){
		if (state in this.stateEndCallback){
			this.stateEndCallback[state].push(fun);
		}else{
			this.stateEndCallback[state] = [fun];
		}
	},
	registerEvent: function(state, event, fun){
		var t;
		if (state in this.eventCallback){
			t = this.eventCallback[state];
		}else{
			this.eventCallback[state] = t = {};
		}
		if (event in t){
			t[event].push(fun);
		}else{
			t[event] = [fun];
		}
	},
	registerTransition: function(state, event, fun){
		var t;
		if (state in this.transitonCallbak){
			t = this.transitonCallbak[state];
		}else{
			this.transitonCallbak[state] = t = {};
		}
		if (event in t){
			t[event].push(fun);
		}else{
			t[event] = [fun];
		}
	},

	callStateBegin: function(state){
		if (state in this.stateBeginCallback){
			var t = this.stateBeginCallback;
			for (var i = 0, l = t.length; i < l; i++){
				t[i].apply(this.target);
			}
		}
	},
	callStateEnd: function(state){
		if (state in this.stateEndCallback){
			var t = this.stateEndCallbacks;
			for (var i = 0, l = t.length; i < l; i++){
				t[i].apply(this.target);
			}
		}
	},
	callEvent: function(state, event){
		if (state in this.eventCallback){
			var t = this.eventCallback;
			if (event in t){
				t = event[t];
				for (var i = 0, l = t.length; i < l; i++){
					t[i].apply(this.target);
				}
			}
		}
	},
	callTransition: function(state, event){
		if (state in this.stateEndCallback){
			var t = this.stateEndCallbacks;
			if (event in t){
				t = event[t];
				for (var i = 0, l = t.length; i < l; i++){
					t[i].apply(this.target);
				}
			}
		}
	},
});

t4.fsm.Fsm = cc.Class.extend({

	transitionMap: null,
	currentState: null,
	callback: null,

	ctor: function(tm, cb) {
		this.init(tm, cb);
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
		}else if (this.callback){
			this.callback.callEvent(this.currentState, event);
		}
	},
	jump: function(to, event){
		if (this.callback){
			this.callback.callStateEnd(this.currentState);
			this.callback.callTransition(this.currentState, event);
			this.currentState = to;	
			this.callback.callStateBegin(this.currentState);
		}else{
			this.currentState = to;
		}
	},
});