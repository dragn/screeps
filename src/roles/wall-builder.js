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
            return;
        }

        var site = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
            filter: function(obj) {
                return obj.structureType == STRUCTURE_WALL;
            }
        });
        if (site) {
            if (this.pos.isNearTo(site)) {
                this.build(site);
            } else {
                this.moveTo(site);
            }
            return;
        }

        var wall = this.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: function(obj) {
                return obj.structureType == STRUCTURE_WALL && obj.hits < 500;
            }
        });
        if (wall) {
            if (this.pos.isNearTo(wall)) {
                this.build(wall);
            } else {
                this.moveTo(wall);
            }
            return;
        }
    }
}
