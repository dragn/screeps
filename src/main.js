var strategy = require('strategies_defensive1'),
    utils = require('utils'),
    roles = {};

module.exports.loop = function () {

    utils.cleanMemory();

    for (var i in Game.spawns) {
        var spawn = Game.spawns[i];
        strategy.call(spawn);
    }

    for (var id in Game.creeps) {
        var creep = Game.creeps[id],
            role = creep.memory.role;
        if (roles[role]) {
            roles[role].call(creep);
        } else {
            roles[role] = require('roles_' + role);
            if (!roles[role]) console.log('No behavior for role: ' + role);
        }
    }
}
