"restrict mode";

/*
@namespace
*/

var sw = sw || {};
sw.MovementDriverComponent = cc.Component.extend({
    ctor: function(){
        this._super();
        this._name = "MovementDriverComponent";
    },
    onEnter: function(){
        var owner = this.getOwner();
        if (owner){
            owner.getScheduler().scheduleUpdateForTarget(this, 0, !this.isEnabled());
        }
    },
    onExit: function(){
        var owner = this.getOwner();
        if (owner){
            owner.getScheduler().unscheduleUpdateForTarget(this);
        }
    },
    setEnabled: function(enable){
        this._super(enable);
        var owner = this.getOwner();
        if (owner){
            if (this.isEnabled()){
                owner.getScheduler().resumeTarget(this);
            }else{
                owner.getScheduler().pauseTarget(this);
            }
        }
    },
    update: function(dt){
        var owner = this.getOwner();
        if (owner){

            var pos = owner.getPosition();
            var dir = owner.kc.get();
            switch(dir){
            case t4.ControlDir.Left:
            case t4.ControlDir.LeftUp:
            case t4.ControlDir.LeftDown:
                pos.x -= dt * owner.speed;
                break;
            case t4.ControlDir.Right:
            case t4.ControlDir.RightUp:
            case t4.ControlDir.RightDown:
                pos.x += dt * owner.speed;
                break;
            }
            switch(dir){
            case t4.ControlDir.Down:
            case t4.ControlDir.RightDown:
            case t4.ControlDir.LeftDown:
                pos.y -= dt * owner.speed;
                break;
            case t4.ControlDir.Up:
            case t4.ControlDir.LeftUp:
            case t4.ControlDir.RightUp:
                pos.y += dt * owner.speed;
                break;
            }
            owner.setPosition(pos);
        }
    },
});
sw.PlayerUnit = t4.Unit.extend({
	ctor: function() {
		this._super();
		// body...
        this.bindSprite('shime20.png');

        var aniFrame = [
			cc.SpriteFrameCache.getInstance().getSpriteFrame('shime20.png'),
			cc.SpriteFrameCache.getInstance().getSpriteFrame('shime21.png'),
        ];
        var animation = cc.Animation.create(aniFrame, 0.1);
        var animate = cc.Animate.create(animation);

        this.moveAction = cc.RepeatForever.create(cc.Sequence.create(animate));
        
        this.sprite.setAnchorPoint(cc.p(0.5, 0.25));

        this.kc = new t4.KeyboardController(this);
        this.kc.bindKey(cc.KEY.a, t4.KeyDir.Left);
        this.kc.bindKey(cc.KEY.s, t4.KeyDir.Down);
        this.kc.bindKey(cc.KEY.d, t4.KeyDir.Right);
        this.kc.bindKey(cc.KEY.w, t4.KeyDir.Up);

        cc.Director.getInstance().getKeyboardDispatcher().addDelegate(this.kc);
        this.kc.start();
        this.speed = 100;

        this.movement = new sw.MovementDriverComponent();
        this.addComponent(this.movement);
        this.cb.registerBegin('Walk', this.OnStateBegin);
        this.cb.registerBegin('Stay', this.OnStateBegin);
	},
    OnStateBegin: function(state){
    	//var action = this.sprite.getActionByTag(1);
    	switch(state){
		case 'Walk':
            this.movement.setEnabled(true);
		 	this.sprite.runAction(this.moveAction);
    		break;
    	case 'Stay':
			this.sprite.stopAction(this.moveAction);
            this.movement.setEnabled(false);
			break;
    	}
    },

	onStartMove: function(state){
		this.actionFsm.response('Move');
	},
	onStopMove: function(state){
		this.actionFsm.response('Stand');
	},
	onTurnLeft: function(state){
		this.sprite.runAction(cc.FlipX.create(false));
	},
	onTurnRight: function(state){
		this.sprite.runAction(cc.FlipX.create(true));
	},
});