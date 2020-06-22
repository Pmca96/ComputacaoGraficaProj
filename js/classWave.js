import {Wolf} from './classMobs.js';
export default class Wave {
    constructor(levelUp){
        this.wolfs = [];
        this.levelUp = levelUp;
    }

    addWolf(position, inv, timeSpawn) {
        this.wolfs.push(new Wolf(position, inv, timeSpawn, this.levelUp));
    }
}



