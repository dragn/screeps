module.exports = function() {
    var enemy = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: function(object) {
            console.log('Name: ' + object.name);
            return object.name != 'Source Keeper';
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
            var x = Math.floor(Math.random() * 50);
            var y = Math.floor(Math.random() * 50);
            this.memory.patrol = { x: x, y: y };
        } else {
            this.memory.lastPos = this.pos;
            this.moveTo(this.memory.patrol.x, this.memory.patrol.y);
            if (this.pos == this.memory.lastPos) {
                delete this.memory.patrol;
            }
        }
    }
}
