## T20 Match Simulator | Bengaluru vs Chennai

Let us watch the awaited rivalry and find out who grabs the title home.

#### How to simulate the game on your machine ?

- Clone the repo
- npm i 
- npm run start

### Requirements
- Match needs 4 overs to play.
- Team banglore left with 3 wickets in hand and need to score 40 more runs.
- Run generator should generate numbers between -1 and 6
- The batting player can score between 0 and 6
- The batsman is considered OUT when scored -1
- Batsmen can change the stike when
    - the player on strike scores 1 or 3 or 5
    - end of every over.
    Note - No strike change when score 1/3/5 at the end of over.
- Player details to be tracked:
    - Runs scored
    - Balls played
    - Status(Out/Not-out/not-played)
- When a player is out, new player comes at the same position.
- Declare the result when match terminates i.e oversleft = 0, wickets_took = 3, 
- Match should go on till
    - Overs left <= total_overs
    - wickets_took < total wickets
- Team banglore wins when
    - Score of banglore is greater than the target
