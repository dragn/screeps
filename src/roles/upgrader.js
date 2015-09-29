var utils = require('utils');

module.exports = function() {
    if (this.spawning) return;

    var base = Game.spawns[this.memory.base];
    var controller = base.room.controller;
    var source = utils.findClosestCached(this, '_source', FIND_SOURCES);

    if ((this.carry.energy < this.carryCapacity && !this.pos.isNearTo(controller)) || this.carry.energy == 0) {
        if (utils.moveToHarvest(this, source)) return;
        if (utils.moveToTakeEnergy(this, base)) return;
    }

    utils.moveToUpgrade(this, controller);
}
