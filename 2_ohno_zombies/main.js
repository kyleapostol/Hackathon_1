

$(document).ready(init);

var roll;

function init(){
    roll = new OhNoZombies();
    $('#roll-dice-button').on("click", roll.rollBothDice);
    $('#roll-dice-button').on("click", 'audio').play();

}
class OhNoZombies {
    constructor() {
        this.dice = {
            players: $('#player-die'),
            zombies: $('#zombie-die'),
        };
        this.squares = $('.space');
        this.playerDie = $('#player-die');
        this.zombieDie = $('#zombie-die');
        this.gamePieces = {
            players: [
                { dom: $('.player-human'),
                  position: 8},
                ],
            zombies: [
                { dom: $('.player-zombie'), 
                  position: 1}
                ]
        };
        this.currentPlayer = 0;
        this.currentZombie = 0;
        this.positionZombie = $('.player-zombie').position();
        this.positionHuman = $('.player-human').position();
        this.rollBothDice = this.rollBothDice.bind(this);

        this.moveGamePiece(this.gamePieces.players[0]);
        this.moveGamePiece(this.gamePieces.zombies[0]); 
        
    }

    rollBothDice() {
        this.zombieCollision();
        this.pieceRoll('players');
        this.pieceRoll('zombies');
    }
    diceRoll(type) {
        var diceType = (type === 'zombies') ? 'z' : '';
        var roll = Math.floor(Math.random() * 6) + 1;
        var dieImage = "assets/dice-images/"+diceType+"dice" + roll + ".png";
        this.dice[type].css('background-image', 'url(' + dieImage + ")");
        return roll;

    }
    moveGamePiece(piece) {
        var maxLength = this.squares.length;
        var position = piece.position;
        console.log('position: ', piece.dom[0]);
        var dom = piece.dom;
        if(position >= maxLength){
            position = position - maxLength;
        }
        var destinationSquare = this.squares[position];
        $(destinationSquare).append(dom);
        console.log('piece', piece.position);
        if (piece.position === 6 || piece.position === 12 || piece.position === 22 ||piece.position === 32 ||piece.position === 42 ||piece.position === 62 ) {
           var weapon = $('#weapon-collision');
            $(weapon).css('display', 'block');
            }
         window.onclick = function(event) {
               if (event.target === weapon) {
              weapon.style.display = "none";
               }
    }
    }
    pieceRoll(type) {
        var currentPiece = this.gamePieces[type][this.currentPlayer];
        var humanConditional = this.gamePieces.players[this.currentPlayer];
        console.log('this is humanConditional: ', humanConditional);
        console.log('this is current piece: ', currentPiece);
        var currentPosition = currentPiece.position;
        currentPiece.position += this.diceRoll(type);
        this.moveGamePiece( currentPiece );
        return;
        
    }
    zombieCollision() {
        var zombieModal = $('#zombie-collision');
        if(roll.gamePieces.players[0].position === roll.gamePieces.zombies[0].position) {
           console.log("they are in the same location");            
           zombieModal.style.display = "block";
        }
    }
    
    weaponCheck() {
       var test = roll.gamePieces.players[0].position;
        console.log('this is a test: ', test);
//        var maxLength = this.squares.length;
//        var position = piece.position;
//        console.log('position: ', position)
//        var dom = piece.dom;
//        if(position >= maxLength){
//            position = position - maxLength;
//        }
//        var destinationSquare = this.squares[position];
//        $(destinationSquare).append(dom);
//        console.log('piece', piece);   
    }
}

