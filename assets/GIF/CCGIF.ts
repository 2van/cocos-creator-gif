import { GIFCache } from "./GIF";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CCGIF extends cc.Component {
    delays = [];
    sp: cc.Sprite;
    frames: cc.SpriteFrame[] = [];
    @property(cc.String)
    path: string = '';
    start() {
        this.sp = this.node.addComponent(cc.Sprite);
        this.node.active = false;
    }
    async preload() {
        GIFCache.getInstance();
        return new Promise((rs, rj) => {
            cc.loader.loadRes(this.path, (err, data) => {
                // console.log(err, data);
                if (err) {
                    rj(err);
                    return;
                }
                let size = data._nativeAsset.spriteFrames[0]._originalSize;
                this.node.setContentSize(size);
                this.delays = data._nativeAsset.delays.map(v => v / 1e2);
                this.frames = data._nativeAsset.spriteFrames;
                rs();
            })
        })
    }
    frameIdx = 0;
    play(loop = false, playNext = false) {
        if (!playNext) {
            this.stop();
        }
        if (this.frames.length) {
            if (this.frameIdx >= this.frames.length) {
                this.frameIdx = 0;
                if (!loop) {
                    this.node.active = false;
                    return;
                }
            }
            this.node.active = true;
            this.sp.spriteFrame = this.frames[this.frameIdx];
            this.scheduleOnce(() => {
                this.play(loop, true);
            }, this.delays[this.frameIdx]);
            this.frameIdx++;
        }
    }
    stop() {
        this.frameIdx = 0;
        this.unscheduleAllCallbacks();
        this.node.active = false;
    }
}