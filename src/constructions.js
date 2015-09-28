module.exports.buildRoad = function(from, to) {
    var path = from.pos.findPathTo(to),
        room = from.room,
        fullPath = true;

    if (room.controller.level < 3) return false;

    for (var i in path) {
        var pos = room.getPositionAt(path[i].x, path[i].y);
        if (pos.lookFor('constructionSite').length == 0 && pos.lookFor('structure').length == 0) {
            if (room.createConstructionSite(pos, STRUCTURE_ROAD) != 0) {
                console.log('failed to add road at ' + pos.x + ', ' + pos.y);
                fullPath = false;
            } else {
                console.log('adding road at ' + pos.x + ', ' + pos.y);
            }
        }
    }

    return fullPath;
}
