"use strict";
var playerHandValue = 0, dealerHandValue = 0;

var output = document.querySelector('#output');
var fireEvent = function( eventName, data) {
	if (window.CustomEvent) {
	  var event = new CustomEvent(eventName, {detail: data});
	} else {
	  var event = document.createEvent('CustomEvent');
	  event.initCustomEvent(eventName, true, true, data);
	}
	document.querySelector('body').dispatchEvent(event);
}

var bindEvent = function (eventName, callback) {
	document.querySelector('body').addEventListener(eventName, callback);
}

var getName = function (value) {
	var name;
	switch (value) {
	    case 1 :
	        name = 'ace';
	        break;
	    case 11 :
	    	name = 'jack';
	        break;
	    case 12 :
	    	name = 'queen';
	        break;
	    case 13 :
	    	name = 'king';
	        break;
	    default :
	        name = value;
	}
	return name;
}
var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


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
//var spades = buildSuit('spades');

var debug = document.getElementById('debug');

debug.addEventListener('click', function (e) {

	e.preventDefault();

	
	var deck = buildDeck();
	console.log(deck);




});
var dealer = [], player = [];
var deal = document.getElementById('deal');
	var dealerOut = document.querySelector('#dealer');
	var playerOut = document.querySelector('#player');
var hit = document.querySelector('#hit');	
var deck;

var stand = document.querySelector('#stand');

var dealTheCards = function (e) {
	if (e) {
		e.preventDefault();
	}
	output.innerHTML =  '';

	dealer = [], player = [];
	dealerOut.innerHTML = '';
	playerOut.innerHTML = '';

	deck = buildDeck();
	console.log(deck);
	
	player.push(deck.pop());
	dealer.push(deck.pop());

	player.push(deck.pop());
	dealer.push(deck.pop());

	console.log(dealer);
	console.log(player);



	dealerOut.innerHTML = '<img src="'+ dealer[0].img + '" />' +  '<img src="'+ dealer[1].img + '" />';
	playerOut.innerHTML = '<img src="'+ player[0].img + '" />' +  '<img src="'+ player[1].img + '" />';

};


deal.addEventListener('click', dealTheCards);

var calculateScore = function (hand) {
	var score = 0;
	var hasAce = false;
	hand.forEach(function (card) {
		if (card.val === 1) {
			hasAce = true;
			score = score + 11;
		}
		if (card.val > 10) {
			score = score + 10;
		} else {
			score = score + card.val;
		}
	});
	if (score > 21 && hasAce) {
		score = score - 10;
	}
	console.log(score);
	return score;
}

hit.addEventListener('click', function (e) {
	e.preventDefault();

	console.log('hit me!!');
 

	player.push(deck.pop());
	var html = [];
	for (var i = 0; i < player.length; i++) {
		html.push('<img src="'+ player[i].img + '" />');
	};
	playerOut.innerHTML =  html.join('');

 	var score = calculateScore(player);
 	if (score > 21) {
 		output.innerHTML = "<h1>BUSTED!!</h1>";
 		//setTimeout(dealTheCards, 4000);
 	}



});
var hitDealer = function () {
	dealer.push(deck.pop());
	var html = [];
	for (var i = 0; i < dealer.length; i++) {
		html.push('<img src="'+ dealer[i].img + '" />');
	};
	dealerOut.innerHTML =  html.join('');
};


stand.addEventListener('click', function (e) {
	e.preventDefault();

	console.log('hit me!!');
	var playerScore = calculateScore(player);
	

	if (calculateScore(dealer) <= playerScore) {
		hitDealer();
	}

	if (calculateScore(dealer) <= playerScore) {
		hitDealer();
	}
	if (calculateScore(dealer) <= playerScore) {
		hitDealer();
	}
	var dealerScore = calculateScore(dealer);
 

 	var score = calculateScore(player);
 	console.log(score);
 	console.log(dealerScore)
 	if (score < 22 && dealerScore > 21) {
 		output.innerHTML = "<h1>You Win - Dealer busted ?!</h1>";
 	} else if (score > dealerScore  && score < 22) {
 		output.innerHTML = "<h1>YOU WIN!!</h1>";
 		//setTimeout(dealTheCards, 4000);
 	} else if (score === dealerScore){
 		 		output.innerHTML = "<h1>PUSH!</h1>";
 		//setTimeout(dealTheCards, 4000);
 	} else  {
 		 		output.innerHTML = "<h1>You Lose ?!</h1>";
 		//setTimeout(dealTheCards, 4000);
 	} 



});