module.exports = function() {
    if (this.spawning) return;

    var base = Game.spawns[this.memory.base];

    if (this.carry.energy < this.carryCapacity && this.upgradeController(base.room.controller) < 0) {
        if (this.pos.isNearTo(base)) {
            base.transferEnergy(this);
        } else {
            this.moveTo(base);
        }
    } else {
        var controller = base.room.controller;
        if (this.pos.isNearTo(controller)) {
            this.upgradeController(controller);
        } else {
            this.moveTo(controller);
        }
    }
}
