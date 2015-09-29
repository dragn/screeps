var utils = require('utils');

module.exports = function() {
    if (this.carry.energy == this.carryCapacity) {
        var base = Game.spawns[this.memory.base];
        if (utils.moveToGiveEnergy(this, base)) return;
    }

    var target = this.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if (target) {
        if (utils.moveToPickup(this, target)) return;
    }

    if (this.carry.energy > 0) {
        var base = Game.spawns[this.memory.base];
        if (utils.moveToGiveEnergy(this, base)) return;
    }
};
