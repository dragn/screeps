module.exports = {

    /**
     * Pick a random alphanumeric string of length `len`
     */
    random: function(len) {
        return Math.random().toString(36).substr(2, len);
    },

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
            if (!population[i]) {
                var name = this.createCreep(queue[i].body, queue[i].role + '_' + module.exports.random(8),
                                            { role: queue[i].role, base: this.name });
                if (typeof name == 'string') {
                    population[i] = { name: name, missCount: 0 };
                }
                break; // can't go further by queue until this place is filled
            } else {
                var creep = Game.creeps[population[i].name];
                if (!creep) {
                    // simulation mode workaround
                    population[i].missCount++;
                } else {
                    population[i].missCount = 0;
                }
            }
            if (population[i].missCount >= 10) {
                console.log('removing dead creep ' + population[i].name);
                population[i] = null;
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
    }
};
