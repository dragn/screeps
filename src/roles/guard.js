module.exports = function() {
    var enemy = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: function(object) {
            return object.owner.username != 'Source Keeper';
        }
    });
    if (enemy) {
        if (this.pos.isNearTo(enemy)) {
            this.attack(enemy);
        } else {
            this.moveTo(enemy);
        }
    } else {
        if (!this.memory.patrol) {
            var base = Game.spawns[this.memory.base];
            var x = base.pos.x + (Math.random() > 0.5 ? 4 : -4);
            var y = base.pos.y + (Math.random() > 0.5 ? 4 : -4);
            this.memory.patrol = { x: x, y: y };
        } else {
            this.moveTo(this.memory.patrol.x, this.memory.patrol.y);
            if (this.pos.isNearTo(this.memory.patrol.x, this.memory.patrol.y)) {
                delete this.memory.patrol;
            }
        }
    }
}
