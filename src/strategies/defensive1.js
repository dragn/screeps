var population = require('population'),
    constructions = require('constructions');

module.exports = function() {
    population.call(this);

    if (!this.memory.hasRoads) {
        var sources = this.room.find(FIND_SOURCES);
        for (var i in sources) {
            constructions.buildRoad(this, sources[i]);
        }
        this.memory.hasRoads = true;
    }

    if (!this.memory.hasRoadToController) {
        if (constructions.buildRoad(this, this.room.controller)) {
            this.memory.hasRoadToController = true;
        }
    }
}
