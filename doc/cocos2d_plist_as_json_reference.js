// format 0 spriteframes.plist as json
{
	metadata: {
		textureFileName: 'path_to_texture.png', // empty string will use filename.plist -> filename.png
		format: 0,//0,1,2,3
	},
	frames: {
		"shime1.png": {
			/* cc.SpriteFrame.initWithTexture(texture, cc.rect(x, y, width, height), false, 
				cc.p(offsetX, offsetY), cc.size(originalWidth, originalHeight));
			*/
			x: 0,
			y: 0,
			width: 128, 
			height: 128,
			offsetX: 0,
			offsetY: 0,
			originalWidth: 128,
			originalHeight: 128,
		},
		"shime2.png": {
			x: 0,
			y: 0,
			width: 128, 
			height: 128,
			originalWidth: 128,
			originalHeight: 128,
			offsetX: 0,
			offsetY: 0,
		},
	],
}
// format 1,2 spriteframes.plist as json
{
	metadata: {
		textureFileName: 'path_to_texture.png', // empty string will use filename.plist -> filename.png
		format: 2,//0,1,2,3
	},
	frames: {
		"shime1.png": {
			/* cc.SpriteFrame.initWithTexture(texture, cc.RectFromString(frame), rotated, 
				cc.PointFromString(offset), cc.SizeFromString(sourceSize));
			*/
			frame: "{{3,2},{4,5}}", // "{{x,y},{w, h}}"
			rotated: true,	// format 2 only
			offset: "{3.0,2.5}", // "{x,y}"
			sourceSize: "{3.0,2.5}", // "{w,h}"
		},
		"shime2.png": {
			frame: "{{3,2},{4,5}}", // "{{x,y},{w, h}}"
			rotated: true,	// format 2 only
			offset: "{3.0,2.5}", // "{x,y}"
			sourceSize: "{3.0,2.5}", // "{w,h}"
		},
	],
}
// format 3 spriteframes.plist as json
{
	metadata: {
		textureFileName: 'path_to_texture.png', // empty string will use filename.plist -> filename.png
		format: 3,//0,1,2,3
	},
	frames: {
		"shime1.png": {
			/* cc.SpriteFrame.initWithTexture(texture, cc.rect(textureRect.x, textureRect.y, spriteSize.width, spriteSize.height), 
				textureRotated, spriteOffset, spriteSourceSize);
			*/
			spriteSize: "{128,128}", // "{w, h}"
			spriteOffset: "{0,0}", // "{x,y}"
			spriteSourceSize: "{128,128}", // "{w, h}"
			textureRect: "{{3,2},{4,5}}", // "{{x,y},{w, h}}"
			textureRotated: true,
			aliases: {
				body: "unit_body",
			},
		},
		"shime2.png": {
			spriteSize: "{128,128}", // "{w, h}"
			spriteOffset: "{0,0}", // "{x,y}"
			spriteSourceSize: "{128,128}", // "{w, h}"
			textureRect: "{{3,2},{4,5}}", // "{{x,y},{w, h}}"
			textureRotated: true,
			aliases: {
				body: "unit_body",
			},
		},
	],
}
// format 1 animation.plist as json
{
	animations: {
		unit1_Stay:{
			frames: ["shime1.png", "shime2.png"],
			delay: 0,
		},
		unit1_Walk:{
			frames: ["shime1.png", "shime2.png", "shime1.png", "shime3.png"],
			delay: 0,
		},
		unit1_Jump:{
			frames: ["shime21.png", "shime22.png"],
			delay: 0,
		},
	},
	properties: {
		format: 1,
		spritessheets:[
			// path to sprites sheets here
		],
	},
}
// format 2 animation.plist as json
{
	animations: {
		unit1_Stay:{
			loops: 1,
			restoreOriginalFrame: true,
			frames: ["shime1.png", "shime2.png"],
			delayPerUnit: 0,
		},
		unit1_Walk:{
			loops: 1,
			restoreOriginalFrame: true,
			frames: ["shime1.png", "shime2.png", "shime1.png", "shime3.png"],
			delayPerUnit: 0,
		},
		unit1_Jump:{
			loops: 1,
			restoreOriginalFrame: true,
			frames: ["shime21.png", "shime22.png"],
			delayPerUnit: 0,
		},
	},
	properties: {
		format: 2,
		spritessheets:[
			// path to sprites sheets here
		],
	},
}
