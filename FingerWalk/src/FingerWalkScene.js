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
var TileSprite = cc.Sprite.extend({
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

        cc.registerTargetedDelegate(0, true, this);
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
});

var g_GameZOrder = {bg: 0, ui: 1};

var FingerWalkScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
   
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
		
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);

		for (var i = 0; i < 10; i++){
			this.tile = new TileSprite();
			this.tile.setAnchorPoint(cc.p(0.5, 0.25));
			this.tile.setPosition(cc.p(Math.random() * 480, i * 50));
			/*
			var rotate = cc.RotateBy.create(1, 90);
			this.tile.runAction(cc.RepeatForever.create(rotate));*/
			this.gameLayer.addChild(this.tile, g_GameZOrder.ui);
		}

    }
});
