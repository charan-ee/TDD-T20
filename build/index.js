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
    function Cricket(total_overs) {
        if (total_overs === void 0) { total_overs = 4; }
        this.players = ["Kirat_Boli", "NS_Sodhi", "R_Rumrah", "Shashi_Henra"];
        this.balls_bowled = 0;
        this.total_wickets = 3;
        // public striker = Tbanglore.getNext()
        // public non_striker = Tbanglore.getNext()
        this.scoreboard = {
            score: 0,
            current_overs: 0,
            striker: this.players.shift(),
            non_striker: this.players.shift(),
            next_to_bat: this.players.shift(),
            target: 40,
            wickets_took: 0
        };
        this.playerscores = {};
        this.total_overs = total_overs;
    }
    Cricket.prototype.startMatch = function () {
        while (this.scoreboard.current_overs < this.total_overs) {
            this.balls_bowled += 1;
            this.setCurrentOvers();
            var run = this.getRun(this.scoreboard.striker);
            this.setScore(run), this.setPlayerScore(run);
            this.getCommentary(run);
            if (run < 0) {
                this.scoreboard.wickets_took += 1;
                this.setNextStriker();
            }
            else if (run % 2 != 0 && this.balls_bowled % 6 != 0) {
                this.changeStrike();
            }
            else if (run % 2 == 0 && this.balls_bowled % 6 == 0) {
                this.changeStrike();
            }
            if (this.scoreboard.score > this.scoreboard.target || this.scoreboard.wickets_took == this.total_wickets) {
                this.logSummary();
                break;
            }
        }
        this.logSummary();
    };
    Cricket.prototype.getCommentary = function (run) {
        if (this.scoreboard.current_overs == 0.1) {
            console.log(this.total_overs + " overs left. " + this.scoreboard.target + " runs to win");
        }
        if (run == 0) {
            console.log(this.scoreboard.current_overs + " " + this.scoreboard.striker + ", no run ");
        }
        else if (run == 1) {
            console.log(this.scoreboard.current_overs + " " + this.scoreboard.striker + " scores " + run + " run ");
        }
        else if (run > 1) {
            console.log(this.scoreboard.current_overs + " " + this.scoreboard.striker + " scores " + run + " runs ");
        }
        else if (run < 0) {
            console.log(this.scoreboard.current_overs + " " + this.scoreboard.striker + " is OUT ");
        }
    };
    Cricket.prototype.setCurrentOvers = function () {
        if (this.balls_bowled % 6 == 0) {
            this.scoreboard.current_overs = this.balls_bowled / 6;
        }
        else {
            this.scoreboard.current_overs = (this.balls_bowled % 6) / 10 + Math.floor(this.balls_bowled / 6);
        }
        return this.scoreboard.current_overs;
    };
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
    Cricket.prototype.changeStrike = function () {
        var temp = this.scoreboard.striker;
        this.scoreboard.striker = this.scoreboard.non_striker;
        this.scoreboard.non_striker = temp;
        return this.scoreboard.striker;
    };
    Cricket.prototype.setNextStriker = function () {
        this.scoreboard.striker = this.scoreboard.next_to_bat;
        this.scoreboard.next_to_bat = (this.players.shift() == undefined ? "None" : this.players.shift());
    };
    Cricket.prototype.setPlayerScore = function (run) {
        if (run >= 0) {
            // console.log(this.playerscores[this.scoreboard.striker].runs)
            this.playerscores[this.scoreboard.striker] = {
                runs: (this.playerscores[this.scoreboard.striker] == undefined) ? run : (this.playerscores[this.scoreboard.striker].runs + run),
                balls: (this.playerscores[this.scoreboard.striker] == undefined) ? 1 : (this.playerscores[this.scoreboard.striker].balls + 1),
                status: 1 /* not_out */
            };
        }
        else {
            this.playerscores[this.scoreboard.striker] = {
                runs: (this.playerscores[this.scoreboard.striker] == undefined) ? 0 : (this.playerscores[this.scoreboard.striker].runs),
                balls: (this.playerscores[this.scoreboard.striker] == undefined) ? 1 : (this.playerscores[this.scoreboard.striker].balls + 1),
                status: 0 /* out */
            };
        }
    };
    Cricket.prototype.logSummary = function () {
        if (this.scoreboard.score < this.scoreboard.target) {
            console.log("Chennai Won by " + (this.scoreboard.target - this.scoreboard.score) + " runs");
        }
        else if (this.scoreboard.score == this.scoreboard.target) {
            console.log('Match ended as draw');
        }
        else {
            console.log("Banglore won by " + (this.total_wickets - this.scoreboard.wickets_took) + " runs and " + ((this.total_overs * 6) - this.balls_bowled) + " balls remaining");
        }
        console.log(this.playerscores);
        return "Match result waiting";
    };
    Cricket.prototype.getCurrentOvers = function () {
        return this.scoreboard.current_overs;
    };
    Cricket.prototype.getWickets = function () {
        return this.scoreboard.wickets_took;
    };
    Cricket.prototype.setScore = function (run) {
        if (run > 0)
            this.scoreboard.score += run;
        return this.scoreboard.score;
    };
    return Cricket;
}());
exports.Cricket = Cricket;
var match = new Cricket();
console.log(match.startMatch());
