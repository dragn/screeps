var utils = require('utils');

module.exports = function() {
    var base = Game.spawns[this.memory.base];

    if (this.carry.energy == 0) {
        if (utils.moveToTakeEnergy(this, base)) return;
    }

    if (base.hits < base.hitsMax) {
        if (utils.moveToRepair(this, base)) return;
    }

    var site = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
        filter: (obj) => obj.structureType == STRUCTURE_WALL
    });

    if (site) {
        if (utils.moveToBuild(this, site)) return;
    }

    var wall = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (obj) => obj.structureType == STRUCTURE_WALL && obj.hits < 10000
    });

    if (wall) {
        if (utils.moveToRepair(this, wall)) return;
    }

    var site = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    if (site) {
        if (utils.moveToBuild(this, site)) return;
    }

    var road = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (obj) => obj.structureType == STRUCTURE_ROAD && obj.hits < obj.hitsMax
    });
    if (road) {
        if (utils.moveToRepair(this, road)) return;
    }
}
