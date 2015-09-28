module.exports = function() {
    if (this.carry.energy == 0) {
        var base = Game.spawns[this.memory.base];
        if (base.transferEnergy(this) < 0) {
            this.moveTo(base);
        }
    } else {
        var site = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (site) {
            if (this.pos.isNearTo(site)) {
                this.build(site);
            } else {
                this.moveTo(site);
            }
        }
    }
}
