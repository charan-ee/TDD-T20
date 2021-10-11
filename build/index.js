"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cricket = void 0;
var scoringProbability = {
    Kirat_Boli: [5, 30, 25, 10, 15, 1, 9, 5],
    NS_Sodhi: [10, 40, 20, 5, 10, 1, 4, 10],
    R_Rumrah: [20, 30, 15, 5, 5, 1, 4, 20],
    Shashi_Henra: [30, 25, 5, 0, 5, 1, 4, 30],
};
var Cricket = /** @class */ (function () {
    function Cricket() {
    }
    Cricket.prototype.getRun = function (player) {
        var weights = scoringProbability[player]; // probabilities
        var results = [-1, 0, 1, 2, 3, 4, 5, 6]; // values to return (7 as wicket)
        var num = Math.floor(Math.random() * (100)), s = 0, lastIndex = weights.length - 1;
        for (var i = 0; i < lastIndex; ++i) {
            s += weights[i];
            if (num < s) {
                return results[i];
            }
        }
        return results[lastIndex];
    };
    return Cricket;
}());
exports.Cricket = Cricket;
