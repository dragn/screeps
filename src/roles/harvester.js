module.exports = function() {
    if (this.carry.energy < this.carryCapacity) {
        var targets = this.room.find(FIND_SOURCES);
        if (targets.length) {
            var source = targets[0];
            if (this.pos.isNearTo(source)) {
                this.harvest(source);
            } else {
                this.moveTo(source);
            }
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
