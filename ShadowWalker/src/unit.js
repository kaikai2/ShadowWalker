"restrict mode";

/*
@namespace
*/

var t4 = t4 || {};

t4.UnitController = cc.Class.extend({
	unit: null,

	ctor: function(){

	},

	// method
	bindUnit: function(unit){
		this.unit = unit;
	},

	// operations
	moveTo: function(pos){
		this.unit.moveTo(pos);
	},
	attack: function(){
		this.unit.attack(pos);
	},
	holdFire: function(){
		this.unit.holdFire();
	},
	setTarget: function(targetId){
		this.unit.setTarget(targetId);
	},
	// blablabla
});

t4.UnitController_RandomWalk = t4.UnitController.extend({
	timer: null,
	ctor: function(){
		this.timer = cc.Timer.timerWithTarget(this, this.update, 10);
	},

	update: function(){

		this.moveTo(cc.p(cc.RANDOM_0_1() * 1000, cc.RANDOM_0_1() * 1000));
	}
});

t4.UnitBasicActionTransitionMap = {
	"Stay": {
		"Move": "Walk",
		"Fire": "Attack",
	},
	"Walk": {
		"Stand": "Stay",
		"Fire": "WalkAttack",
	},
	"Attack": {
		"Move": "WalkAttack",
		"HoldFire": "Stay",
	},
	"WalkAttack": {
		"Stand": "Attack",
		"HoldFire": "Walk",
	},
};


t4.Unit = cc.Class.extend({
	controller: null,
	id: null, // unitid
	actionFsm: null,

	ctor: function(){
		this.bindController(new t4.UnitController_RandomWalk());
		var tm = new t4.fsm.TransitionMap(t4.UnitBasicActionTransitionMap);
		var cb = new t4.fsm.Callback(this);
		this.actionFsm = new t4.fsm.Fsm(tm, cb);
	},

	// method
	bindController: function(controller){
		this.controller = controller;
		controller.bindUnit(this);
	},
	// operations
	moveTo: function(pos){
		this.actionFsm.response('Move');
	},
	attack: function(){
		this.actionFsm.response('Fire');
	},
	holdFire: function(){
		this.actionFsm.response('HoldFire');
	},
	setTarget: function(targetId){
	},
	// blablabla
});