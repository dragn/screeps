var utils = require('utils');

module.exports = function() {
    var base = Game.spawns[this.memory.base];

    if (this.carry.energy == 0) {
        if (utils.moveToTakeEnergy(this, base)) return;
    }

    if (base.hits < base.hitsMax) {
        if (utils.moveToRepair(this, base)) return;
    }

    var site = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    if (site) {
        if (utils.moveToBuild(this, site)) return;
    }
}
