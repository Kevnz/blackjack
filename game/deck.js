var buildSuit = function (suit) {

	var cards = [];

	for (var i = 1; i <= 13; i++) {
		var cardname = getName(i);
		var cardIMAGE = '/assets/card'+suit+cardname + '.png';
		if (i === 1 || i > 10) {
			cardIMAGE = '/assets/card'+suit+cardname.slice(0,1) + '.png';
		}
		
		cards.push({val: i, suit: suit, name: cardname, img: cardIMAGE});
	}

	return cards;
}
var buildDeck = function () {
	var spades = shuffleArray(buildSuit('spades'));
	var diamonds = shuffleArray(buildSuit('diamonds'));
	var hearts = shuffleArray(buildSuit('hearts'));
	var clubs = shuffleArray(buildSuit('clubs'));

	var deck =  shuffleArray(spades.concat(diamonds, hearts, clubs));
	return deck;
}

var Deck = function (numberOfDecks) {

	if (numberOfDecks === null) {
		numberOfDecks = 1;
	}

}
