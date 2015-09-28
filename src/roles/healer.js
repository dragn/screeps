module.exports = function() {
    var base = Game.spawns[this.memory.base];
    var target = this.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: function(obj) {
            return obj.hits < obj.hitsMax;
        }
    });
    if (target) {
        if (this.pos.isNearTo(target)) {
            this.heal(target);
        } else {
            this.moveTo(target);
        }
    }
};
