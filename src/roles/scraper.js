module.exports = function() {
    if (this.carry.energy == this.carryCapacity) {
        var base = Game.spawns[this.memory.base];
        if (this.pos.isNearTo(base)) {
            this.transferEnergy(base);
        } else {
            this.moveTo(base);
        }
    }
    var target = this.pos.findClosestInRange(FIND_DROPPED_ENERGY);
    if (target) {
        if (this.pos.isNearTo(target)) {
            this.pickup(target);
        } else {
            this.moveTo(target);
        }
    } else {
        var base = Game.spawns[this.memory.base];
        if (this.pos.isNearTo(base)) {
            this.transferEnergy(base);
        } else {
            this.moveTo(base);
        }
    }
};
