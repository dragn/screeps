module.exports = function() {
    var base = Game.spawns[this.memory.base];
    if (this.carry.energy == 0) {
        if (base.transferEnergy(this) < 0) {
            this.moveTo(base);
        }
    } else {
        if (base.hits < base.hitsMax) {
            if (this.pos.isNearTo(base)) {
                this.repair(base);
            } else {
                this.moveTo(base);
            }
        }

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
