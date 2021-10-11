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
        expect(run).toBeGreaterThanOrEqual(0)
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
})