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
        if (base.energy == base.energyCapacity) {
            base = this.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: function(object) {
                    return object.structureType == STRUCTURE_EXTENSION &&
                        object.energy < object.energyCapacity;
                }
            });
        }
        if (this.pos.isNearTo(base)) {
            this.transferEnergy(base);
        } else {
            this.moveTo(base);
        }
    }
};
