var utils = require('utils');

var creeps = [
    { body: [MOVE, CARRY, WORK], role: 'harvester' },
    { body: [MOVE, CARRY, WORK], role: 'harvester' },
    { body: [MOVE, MOVE, ATTACK], role: 'guard' },
    { body: [MOVE, CARRY, MOVE, CARRY, WORK], role: 'harvester' },
    { body: [MOVE, ATTACK, MOVE, ATTACK], role: 'guard' },
    { body: [MOVE, CARRY, MOVE, CARRY, WORK], role: 'builder' },
    { body: [MOVE, HEAL], role: 'healer' },
    { body: [MOVE, ATTACK, MOVE, ATTACK], role: 'guard' },
    { body: [MOVE, MOVE, CARRY], role: 'scraper' },
    { body: [TOUGH, TOUGH, TOUGH, MOVE, ATTACK, MOVE, ATTACK], role: 'guard' },
    { body: [TOUGH, TOUGH, TOUGH, MOVE, ATTACK, MOVE, ATTACK], role: 'guard' },
    { body: [TOUGH, TOUGH, TOUGH, MOVE, ATTACK, MOVE, ATTACK], role: 'guard' },
    { body: [MOVE, HEAL], role: 'healer' },
];

module.exports = function() {
    utils.populationControl.call(this, creeps);
}
