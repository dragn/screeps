function moveAndDo(creep, target, action) {
    if (!target) return false;
    //console.log('moveAndDo ' + creep.name + ' ' + target.pos.x + 'x' + target.pos.y + ' ' + action);
    if (creep.pos.isNearTo(target)) {
        var action =  creep[action](target);
        //console.log('action ' + action);
        return action == 0;
    } else {
        var move = creep.moveTo(target);
        //console.log('move ' + move);
        return move == 0;
    }
};

module.exports = {

    /**
     * Pick a random alphanumeric string of length `len`
     */
    random: (len) => Math.random().toString(36).substr(2, len),

    /**
     * Clean up dead creeps memory
     */
    cleanMemory: function() {
        for (var i in Memory.creeps) {
            if (!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    },

    /**
     * Control spawn's population
     */
    populationControl: function(queue) {
        if (this.spawning) return;

        if (!this.memory.population) this.memory.population = [];

        var population = this.memory.population;

        for (var i = 0; i < queue.length; i++) {
            var pop = population[i];
            if (!pop) {
                var name = this.createCreep(queue[i].body, queue[i].role + '_' + module.exports.random(8),
                                            { role: queue[i].role, base: this.name });
                if (typeof name == 'string') {
                    population[i] = { name: name };
                }
                break; // can't go further by queue until this place is filled
            } else {
                var creep = Game.creeps[pop.name];
                if (creep && !pop.registered) pop.registered = true;
                if (!creep && pop.registered) {
                    console.log('removing dead creep ' + pop.name);
                    population[i] = null;
                }
            }
        }
    },

    /**
     * Schedule a road contruction from `from` to `to`
     */
    buildRoad: function(from, to) {
        var path = from.pos.findPathTo(to),
            room = from.room,
            fullPath = true;

        if (room.controller.level < 3) return false;

        for (var i in path) {
            var pos = room.getPositionAt(path[i].x, path[i].y);
            if (pos.lookFor('constructionSite').length == 0 && pos.lookFor('structure').length == 0) {
                if (room.createConstructionSite(pos, STRUCTURE_ROAD) != 0) {
                    fullPath = false;
                }
            }
        }

        return fullPath;
    },

    moveToAttack:       (creep, target) => moveAndDo(creep, target, 'attack'),
    moveToRepair:       (creep, target) => moveAndDo(creep, target, 'repair'),
    moveToBuild:        (creep, target) => moveAndDo(creep, target, 'build'),
    moveToHeal:         (creep, target) => moveAndDo(creep, target, 'heal'),
    moveToHarvest:      (creep, target) => moveAndDo(creep, target, 'harvest'),
    moveToGiveEnergy:   (creep, target) => moveAndDo(creep, target, 'transferEnergy'),
    moveToPickup:       (creep, target) => moveAndDo(creep, target, 'pickup'),
    moveToUpgrade:      (creep, target) => moveAndDo(creep, target, 'upgradeController'),

    moveToTakeEnergy: function(creep, target) {
        if (creep.pos.isNearTo(target)) {
            return target.transferEnergy(creep) == 0;
        } else {
            return creep.moveTo(target) == 0;
        }
    },

    findClosestCached: function(creep, cacheName, type) {
        if (!creep.memory[cacheName]) {
            var find = creep.pos.findClosestByPath(type);
            if (find) creep.memory[cacheName] = find.id;
        }
        return Game.getObjectById(creep.memory[cacheName]);
    }
};
