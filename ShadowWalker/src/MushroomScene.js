var MyLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,

    init:function () {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            s_CloseNormal,
            s_CloseSelected,
            function () {
                cc.log("close");
            },this);
        closeItem.setAnchorPoint(cc.p(0.5, 0.5));

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);
        closeItem.setPosition(cc.p(size.width - 20, 20));

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("Hello World", "Impact", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(cc.p(size.width / 2, size.height - 40));
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        // add "Helloworld" splash screen"
        this.sprite = cc.Sprite.create(s_HelloWorld);
        this.sprite.setAnchorPoint(cc.p(0.5, 0.5));
        this.sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(this.sprite, 0);
    }
});
var MushroomSprite = cc.Sprite.extend({
    ctor: function () {
        this._super();

        var aniFrame = [];
        aniFrame.push(cc.SpriteFrame.create(s_shime, cc.rect(0,0,128,128)));
        aniFrame.push(cc.SpriteFrame.create(s_shime2, cc.rect(0,0,128,128)));
        this.initWithSpriteFrame(aniFrame[0]);

        var animation = cc.Animation.create(aniFrame, 0.3);
        var animate = cc.Animate.create(animation);

        var seq = cc.Sequence.create(animate)
        this.runAction(cc.RepeatForever.create(seq));

        cc.Director.getInstance().getTouchDispatcher().addTargetedDelegate(this, 0, true);

        this.kc = new t4.KeyboardController();
        this.kc.bindKey(cc.KEY.a, t4.KeyDir.Left);
        this.kc.bindKey(cc.KEY.s, t4.KeyDir.Down);
        this.kc.bindKey(cc.KEY.d, t4.KeyDir.Right);
        this.kc.bindKey(cc.KEY.w, t4.KeyDir.Up);

        cc.Director.getInstance().getKeyboardDispatcher().addDelegate(this.kc);
        this.kc.start();
        this.scheduleUpdate();
        this.speed = 100;
    },
    containsTouchLocation: function(touch){
        var getPoint = touch.getLocation();
        var contentSize = this.getContentSize();
        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRect.origin.x += this.getPosition().x - contentSize.width / 2;
        myRect.origin.y += this.getPosition().y - contentSize.height / 2;
        return cc.rectContainsPoint(myRect, getPoint);
    },
    onTouchBegan: function(touch, event){
        if (!this.containsTouchLocation(touch))
            return false;
        return true;
    },
    onTouchMoved: function(touch, event){
        var touchPoint = touch.getLocation();
        this.setPositionX(touchPoint.x);
    },
    update: function(dt){
        var pos = this.getPosition();
        var dir = this.kc.get();
        switch(dir){
        case t4.ControlDir.Left:
            pos.x -= dt * this.speed;
            break;
        case t4.ControlDir.Right:
            pos.x += dt * this.speed;
            break;
        case t4.ControlDir.Up:
            pos.y += dt * this.speed;
            break;
        case t4.ControlDir.Down:
            pos.y -= dt * this.speed;
            break;
        case t4.ControlDir.LeftUp:
            pos.x -= dt * this.speed;
            pos.y += dt * this.speed;
            break;
        case t4.ControlDir.LeftDown:
            pos.x -= dt * this.speed;
            pos.y -= dt * this.speed;
            break;
        case t4.ControlDir.RightUp:
            pos.x += dt * this.speed;
            pos.y += dt * this.speed;
            break;
        case t4.ControlDir.RightDown:
            pos.x += dt * this.speed;
            pos.y -= dt * this.speed;
            break;
        }
        this.setPosition(pos);
    }
});

var g_GameZOrder = {bg: 0, ui: 1};

var MushroomScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        /*
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
*/
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);

        /*var bg = cc.Sprite.create(s_groud1);
        this.gameLayer.addChild(bg, 0);
        bg.setAnchorPoint(cc.p(0,0));
        bg.setPosition(cc.p(0,0));
*/
        this.mushroom = new MushroomSprite();
        this.mushroom.setAnchorPoint(cc.p(0.5, 0.25));
        this.mushroom.setPosition(cc.p(240,120));
/*
        var rotate = cc.RotateBy.create(1, 90);
        this.mushroom.runAction(cc.RepeatForever.create(rotate));*/
        this.gameLayer.addChild(this.mushroom, g_GameZOrder.ui);

        this.map = new sw.MapManager();
        for (var i = 0; i < 100; ++i){
            this.map.add(new sw.MapObj());
        }
        
        this.map.initScene(this.gameLayer);

        this.map.syncScene();
    }
});
