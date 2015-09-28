var utils = require('utils');

var creeps = [
    { body: [MOVE, CARRY, WORK], role: 'harvester' },
    { body: [MOVE, CARRY, WORK], role: 'harvester' },
    { body: [MOVE, MOVE, ATTACK], role: 'guard' },
    { body: [MOVE, CARRY, MOVE, CARRY, WORK], role: 'harvester' },
    { body: [MOVE, MOVE, ATTACK, ATTACK], role: 'guard' },
    { body: [MOVE, CARRY, MOVE, CARRY, WORK], role: 'builder' },
    { body: [MOVE, HEAL], role: 'healer' },
    { body: [MOVE, MOVE, ATTACK, ATTACK], role: 'guard' },
    { body: [MOVE, MOVE, CARRY], role: 'scraper' },
    { body: [MOVE, ATTACK, ATTACK, TOUGH], role: 'guard' }
];

module.exports = function() {
    utils.populationControl.call(this, creeps);
}
