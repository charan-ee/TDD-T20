const scoringProbability: { [name: string]: number[] } = {
    Kirat_Boli: [5, 30, 25, 10, 15, 1, 9, 5],
    NS_Sodhi: [10, 40, 20, 5, 10, 1, 4, 10],
    R_Rumrah: [20, 30, 15, 5, 5, 1, 4, 20],
    Shashi_Henra: [30, 25, 5, 0, 5, 1, 4, 30],
  };

export class Cricket{
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
}

