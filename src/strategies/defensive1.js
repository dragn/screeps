var utils = require('utils');

var creeps = [
    { body: [MOVE, CARRY, WORK], role: 'harvester' },
    { body: [MOVE, CARRY, WORK], role: 'harvester' },
    { body: [MOVE, MOVE, ATTACK], role: 'guard' },
    { body: [MOVE, CARRY, MOVE, CARRY, WORK], role: 'upgrader' },
    { body: [MOVE, CARRY, MOVE, CARRY, WORK], role: 'harvester' },
    { body: [MOVE, MOVE, ATTACK, ATTACK], role: 'guard' },
    { body: [MOVE, CARRY, MOVE, CARRY, WORK], role: 'upgrader' },
    { body: [MOVE, CARRY, MOVE, CARRY, WORK], role: 'builder' },
    { body: [MOVE, CARRY, MOVE, CARRY, WORK], role: 'builder' },
    { body: [MOVE, MOVE, ATTACK, ATTACK], role: 'guard' }
];

module.exports = function() {

    utils.populationControl.call(this, creeps);

    if (!this.memory.hasRoads) {
        var sources = this.room.find(FIND_SOURCES);
        for (var i in sources) {
            utils.buildRoad(this, sources[i]);
        }
        this.memory.hasRoads = true;
    }

    if (!this.memory.hasRoadToController) {
        if (utils.buildRoad(this, this.room.controller)) {
            this.memory.hasRoadToController = true;
        }
    }
}
