import CCGIF from "./CCGIF";

const { ccclass, property } = cc._decorator;

@ccclass
export class CCGIFTest extends cc.Component {
    async start() {
        cc.find('Canvas/loading').active = true;
        cc.find('Canvas/btnPlay').active = false;
        await Promise.all(this.node.children.map(n =>
            n.getComponent(CCGIF).preload()
        ))
        cc.find('Canvas/loading').active = false;
        cc.find('Canvas/btnPlay').active = true;
        console.debug('preload success');
        this.playAll();
    }
    playAll() {
        this.node.children.forEach(v => v.getComponent(CCGIF).play());
    }
}