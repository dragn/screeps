var strats = {},
    utils = require('utils'),
    roles = {};

module.exports.loop = function () {

    utils.cleanMemory();

    for (var i in Game.spawns) {
        var spawn = Game.spawns[i],
            strat = spawn.memory.strategy;
        if (strat) {
            if (!strats[strat]) strats[strat] = require('strategies_' + strat);
            strats[strat].call(spawn);
        } else {
            spawn.memory.strategy = spawn.name == 'Survival' ? 'survival1' : 'defensive1';
            console.log('Spawn "' + spawn.name + '" strategy set to ' + spawn.memory.strategy);
        }
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
