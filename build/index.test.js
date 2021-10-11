"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var players = ["Kirat_Boli", "NS_Sodhi", "R_Rumrah", "Shashi_Henra"];
describe(" testing the T20 Match ", function () {
    var cricketMatch;
    beforeEach(function () {
        cricketMatch = new index_1.Cricket();
    });
    it("tells that Cricket class exists", function () {
        expect(cricketMatch).toBeDefined();
    });
    it("checks whether player is scoring run between 0 and 6", function () {
        var player = 'Kirat_Boli';
        var run = cricketMatch.getRun(player);
        expect(run).toBeGreaterThanOrEqual(0);
        expect(run).toBeLessThanOrEqual(6);
    });
    for (var i = 0; i < players.length; i += 1) {
        it("checks whether " + players[i] + " will be bowled out", function () {
            var mockMath = Object.create(global.Math);
            mockMath.random = function () { return 0.03; };
            global.Math = mockMath;
            var run = cricketMatch.getRun('NS_Sodhi');
            expect(run).toBe(-1);
        });
    }
});
