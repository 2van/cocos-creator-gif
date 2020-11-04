import { GIFCache } from "./GIF";

const { ccclass, property } = cc._decorator;

@ccclass
export default class test extends cc.Component {
    delay = 1;
    sp: cc.Sprite;
    frames: cc.SpriteFrame[] = [];
    start() {
        this.sp = this.node.getComponent(cc.Sprite);
        GIFCache.getInstance();
        cc.loader.loadRes('1.gif', (err, a) => {
            console.log(err, a);
            let size = a._nativeAsset.spriteFrames[0]._originalSize;
            this.node.setContentSize(size);
            this.delay = a._nativeAsset.delays[0] / 1e2;
            this.frames = a._nativeAsset.spriteFrames;
            this.updateSp();
            this.schedule(this.updateSp, this.delay);
        })
    }
    frameIdx = 0;
    updateSp() {
        if (this.frames.length) {
            let sp = this.frames[this.frameIdx];
            if (sp) {
                this.sp.spriteFrame = sp;
            } else {
                this.frameIdx = 0;
            }
            this.frameIdx++;
        }
    }
}