import { Tbanglore } from "./players";

const scoringProbability: { [name: string]: number[] } = {
    Kirat_Boli: [5, 30, 25, 10, 15, 1, 9, 5],
    NS_Sodhi: [10, 40, 20, 5, 10, 1, 4, 10],
    R_Rumrah: [20, 30, 15, 5, 5, 1, 4, 20],
    Shashi_Henra: [30, 25, 5, 0, 5, 1, 4, 30],
  };

const enum status { 'out', 'not_out', 'not_played'}
export class Cricket{
    private players = ["Kirat_Boli", "NS_Sodhi", "R_Rumrah", "Shashi_Henra"]
    private total_overs;
    private balls_bowled = 0
    private total_wickets = 3;
    // public striker = Tbanglore.getNext()
    // public non_striker = Tbanglore.getNext()

    public scoreboard: {
        score: number ,
        current_overs: number,
        striker: any,
        non_striker: any,
        next_to_bat: any,
        target: number
        wickets_took: number
    } = {
        score: 0,
        current_overs: 0,
        striker: this.players.shift(),
        non_striker: this.players.shift(),
        next_to_bat: this.players.shift(),
        target: 40,
        wickets_took: 0
    }

    public playerscores: {
        [name: string]: { 
            runs: number,
            balls: number,
            status: status
        }
    } = {}

    constructor(total_overs: number = 4){
        this.total_overs = total_overs
    }

    startMatch(): void{
        while(this.scoreboard.current_overs < this.total_overs){
            this.balls_bowled += 1
            this.setCurrentOvers()
            const run = this.getRun(this.scoreboard.striker)
            this.setScore(run), this.setPlayerScore(run)
            this.getCommentary(run)
            if (run<0){
                this.scoreboard.wickets_took += 1
                this.setNextStriker()
            }
            else if(run%2 != 0 && this.balls_bowled%6 != 0){
                this.changeStrike()
            }
            else if(run%2 == 0 && this.balls_bowled%6 == 0){
                this.changeStrike()
            }
            
            
            if(this.scoreboard.score > this.scoreboard.target || this.scoreboard.wickets_took == this.total_wickets){
                this.logSummary()
                break
            }
            
        }
        this.logSummary()

    }

    getCommentary(run: number): void{
        if (this.scoreboard.current_overs == 0.1){
            console.log(`${this.total_overs} overs left. ${this.scoreboard.target} runs to win`)
        }
        if(run == 0){
            console.log(`${this.scoreboard.current_overs} ${this.scoreboard.striker}, no run `)
        }
        else if(run == 1){
            console.log(`${this.scoreboard.current_overs} ${this.scoreboard.striker} scores ${run} run `)
        }
        else if(run > 1){
            console.log(`${this.scoreboard.current_overs} ${this.scoreboard.striker} scores ${run} runs `)
        }
        else if(run<0){
            console.log(`${this.scoreboard.current_overs} ${this.scoreboard.striker} is OUT `)
        }
    }

    setCurrentOvers() {
        if(this.balls_bowled%6 == 0){
            this.scoreboard.current_overs = this.balls_bowled/6
        }else{
            this.scoreboard.current_overs = (this.balls_bowled%6)/10 + Math.floor(this.balls_bowled/6)
        }
        return this.scoreboard.current_overs
    }

    getRun(player: string): number{
        var weights: number[] = scoringProbability[player]; // probabilities
        var results: number[] = [-1, 0, 1, 2, 3, 4, 5, 6]; // values to return (7 as wicket)
        var num: number = Math.floor(Math.random() * (100)),
        s: number = 0,
        lastIndex: number = weights.length - 1;
        for (var i: number = 0; i < lastIndex; ++i) {
            s += weights[i];
            if (num < s) {
                return results[i];
            }
        }       
        return results[lastIndex];
    }

    changeStrike(): string{
        var temp: string = this.scoreboard.striker;
        this.scoreboard.striker = this.scoreboard.non_striker
        this.scoreboard.non_striker = temp;
        return this.scoreboard.striker
    }

    setNextStriker(): void{
        this.scoreboard.striker = this.scoreboard.next_to_bat
        this.scoreboard.next_to_bat = (this.players.shift() == undefined ? "None" : this.players.shift())
    }

    setPlayerScore(run: number): void{
        if (run>=0){
            // console.log(this.playerscores[this.scoreboard.striker].runs)
            this.playerscores[this.scoreboard.striker] = {
                runs: (this.playerscores[this.scoreboard.striker] == undefined) ? run : (this.playerscores[this.scoreboard.striker].runs + run),
                balls: (this.playerscores[this.scoreboard.striker] == undefined) ? 1 : (this.playerscores[this.scoreboard.striker].balls+1),
                status: status.not_out
            } 
        }
        else{
            this.playerscores[this.scoreboard.striker] = {
                runs: (this.playerscores[this.scoreboard.striker] == undefined) ? 0 : (this.playerscores[this.scoreboard.striker].runs),
                balls: (this.playerscores[this.scoreboard.striker] == undefined) ? 1 : (this.playerscores[this.scoreboard.striker].balls+1),
                status: status.out
            } 
        }
        
    }

    logSummary(): string{
        if(this.scoreboard.score < this.scoreboard.target){
            console.log(`Chennai Won by ${this.scoreboard.target - this.scoreboard.score} runs`)
        }
        else if(this.scoreboard.score == this.scoreboard.target){
            console.log('Match ended as draw')
        }
        else{
            console.log(`Banglore won by ${this.total_wickets - this.scoreboard.wickets_took} runs and ${(this.total_overs * 6) - this.balls_bowled} balls remaining`);
        }
        console.log(this.playerscores)
        return "Match result waiting"
    }

    getCurrentOvers(): number{
        return this.scoreboard.current_overs
    }

    getWickets(): number{
        return this.scoreboard.wickets_took
    }

    setScore(run: number): number{
        if (run>0) this.scoreboard.score += run
        return this.scoreboard.score
    }
}


const match = new Cricket();
console.log(match.startMatch())