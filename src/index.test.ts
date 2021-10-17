import { Cricket } from "./index";

const players = ["Kirat_Boli", "NS_Sodhi", "R_Rumrah", "Shashi_Henra"]

describe(" testing the T20 Match ", () => {
    let cricketMatch: Cricket;
    beforeEach(() => {
        cricketMatch = new Cricket();
    })
    it("tells that Cricket class exists", () => {
        expect(cricketMatch).toBeDefined()
    })


    it("checks whether player is scoring run between 0 and 6", () => {
        let player = 'Kirat_Boli'
        let run = cricketMatch.getRun(player)
        expect(run).toBeGreaterThanOrEqual(-1)
        expect(run).toBeLessThanOrEqual(6)
    })

    for(var i = 0; i<players.length; i+=1){
        it(`checks whether ${players[i]} will be bowled out`, () => {
            const mockMath = Object.create(global.Math);
            mockMath.random = () => 0.03;
            global.Math = mockMath;
            const run = cricketMatch.getRun('NS_Sodhi')
            expect(run).toBe(-1)
        })
    }

    it("check whether players changing the strike after scoring 1 or 3 or 5", () => {
        let striker = players[0]
        let non_striker = players[1]
        const result = cricketMatch.changeStrike()
        
        expect(result).toBe(non_striker)
    })

    it("checks whether the match is simulating for 4 overs.", () => {
        cricketMatch.startMatch()
        const result = cricketMatch.getCurrentOvers()

        expect(result).toBeLessThanOrEqual(4)
    })

    it("checks whether the match terminates after 3 wickets", () => {
        cricketMatch.startMatch()
        let wickets_took = cricketMatch.getWickets()
        expect(wickets_took).toBe(3)
    })

    it("checks whether the score is updated when run > 0 and score = 0", () => {
        let run = 3
        const score = cricketMatch.setScore(run)

        expect(score).toBe(3)
    })

    it("checks score doesn't update when player is out", ()=>{
        let run=-1
        const score = cricketMatch.setScore(run)

        expect(score).toBe(cricketMatch.scoreboard.score)
    })

    
})