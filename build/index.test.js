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
        expect(run).toBeGreaterThanOrEqual(-1);
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
    it("check whether players changing the strike after scoring 1 or 3 or 5", function () {
        var striker = players[0];
        var non_striker = players[1];
        var result = cricketMatch.changeStrike();
        expect(result).toBe(non_striker);
    });
    it("checks whether the match is simulating for 4 overs.", function () {
        cricketMatch.startMatch();
        var result = cricketMatch.getCurrentOvers();
        expect(result).toBeLessThanOrEqual(4);
    });
    it("checks whether the match terminates after 3 wickets", function () {
        cricketMatch.startMatch();
        var wickets_took = cricketMatch.getWickets();
        expect(wickets_took).toBe(3);
    });
    it("checks whether the score is updated when run > 0 and score = 0", function () {
        var run = 3;
        var score = cricketMatch.setScore(run);
        expect(score).toBe(3);
    });
    it("checks score doesn't update when player is out", function () {
        var run = -1;
        var score = cricketMatch.setScore(run);
        expect(score).toBe(cricketMatch.scoreboard.score);
    });
});
