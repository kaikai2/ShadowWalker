"restrict mode";

/*
@namespace
*/

var sw = sw || {};

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

        var seq = cc.Sequence.create(animate)
        this.moveAction = cc.RepeatForever.create(seq);
        this.moveAction.setTag(1);
        
        this.sprite.setAnchorPoint(cc.p(0.5, 0.25));
        this.sprite.setPosition(cc.p(240,120));
        this.addChild(this.sprite);

        //cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);

        this.kc = new t4.KeyboardController(this);
        this.kc.bindKey(cc.KEY.a, t4.KeyDir.Left);
        this.kc.bindKey(cc.KEY.s, t4.KeyDir.Down);
        this.kc.bindKey(cc.KEY.d, t4.KeyDir.Right);
        this.kc.bindKey(cc.KEY.w, t4.KeyDir.Up);

        cc.Director.getInstance().getKeyboardDispatcher().addDelegate(this.kc);
        this.kc.start();
        this.scheduleUpdate();
        this.speed = 100;

        this.cb.registerBegin('Walk', this.OnStateBegin);
        this.cb.registerBegin('Stay', this.OnStateBegin);
	},
    update: function(dt){
        var pos = this.getPosition();
        var dir = this.kc.get();
        switch(dir){
        case t4.ControlDir.Left:
        case t4.ControlDir.LeftUp:
        case t4.ControlDir.LeftDown:
            pos.x -= dt * this.speed;
            break;
        case t4.ControlDir.Right:
        case t4.ControlDir.RightUp:
        case t4.ControlDir.RightDown:
            pos.x += dt * this.speed;
            break;
        }
        switch(dir){
        case t4.ControlDir.Down:
        case t4.ControlDir.RightDown:
        case t4.ControlDir.LeftDown:
            pos.y -= dt * this.speed;
            break;
        case t4.ControlDir.Up:
        case t4.ControlDir.LeftUp:
        case t4.ControlDir.RightUp:
            pos.y += dt * this.speed;
            break;
        }
        this.setPosition(pos);
    },
    OnStateBegin: function(state){
    	//var action = this.sprite.getActionByTag(1);
    	switch(state){
		case 'Walk':
		 	this.sprite.runAction(this.moveAction);
    		break;
    	case 'Stay':
			this.sprite.stopAction(this.moveAction);
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