var population = {
    harvester: 3,
    upgrader: 2,
    builder: 1,
    guard: 2
}

var prototypes = {
    harvester: [MOVE, CARRY, WORK],
    upgrader: [MOVE, CARRY, MOVE, CARRY, WORK],
    builder: [MOVE, CARRY, WORK, WORK],
    guard: [MOVE, MOVE, ATTACK]
}

module.exports = function() {
    if (this.spawning) return;

    if (!this.memory.byRole) this.memory.byRole = {};

    var byRole = this.memory.byRole;

    for (var role in population) {
        if (!byRole[role]) {
            byRole[role] = [];
        }
        for (var index in byRole[role]) {
            var creepName = byRole[role][index];
            var creep = Game.creeps[creepName];
            if (!creep || (typeof creep == 'object' && creep.ticksToLive <= 0)) {
                byRole[role].splice(index, 1);
            }
        }
        if (byRole[role].length < population[role]) {
            var name = this.createCreep(prototypes[role], role + '_' + Math.random().toString(36).substr(2, 8), { role: role, base: this.name });
            if (typeof name == 'string') {
                byRole[role].push(name);
                return;
            }
        }
    }
}
