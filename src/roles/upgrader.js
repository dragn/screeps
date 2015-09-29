module.exports = function() {
    if (this.spawning) return;

    var base = Game.spawns[this.memory.base];
    var controller = base.room.controller;

    if ((this.carry.energy < this.carryCapacity && !this.pos.isNearTo(controller)) || this.carry.energy == 0) {
        var source = this.pos.findClosestByPath(FIND_SOURCES);
        if (source) {
            if (this.pos.isNearTo(source)) {
                this.harvest(source);
            } else {
                this.moveTo(source);
            }
        }
    } else {
        if (this.pos.isNearTo(controller)) {
            this.upgradeController(controller);
        } else {
            this.moveTo(controller);
        }
    }
}
