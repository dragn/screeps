var utils = require('utils');

module.exports = function() {
    var base = Game.spawns[this.memory.base];

    if (this.carry.energy < this.carryCapacity) {
        var source = utils.findClosestCached(this, '_source', FIND_SOURCES);
        if (utils.moveToHarvest(this, source)) return;
    }

    if (base.energy == base.energyCapacity) {
        var ext = this.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (object) => object.structureType == STRUCTURE_EXTENSION &&
                    object.energy < object.energyCapacity
        });
        if (ext) {
            if (utils.moveToGiveEnergy(this, ext)) return;
        } else {
            return this.moveTo(base);
        }
    }

    utils.moveToGiveEnergy(this, base);
};
