var utils = require('utils');

module.exports = function() {
    var base = Game.spawns[this.memory.base];

    if (this.hits < this.hitsMax) return this.heal(this);

    var target = this.pos.findClosestByRange(
        FIND_MY_CREEPS, { filter: (obj) => obj.hits < obj.hitsMax });

    if (target) {
        if (utils.moveToHeal(this, target)) return;
    }
};
