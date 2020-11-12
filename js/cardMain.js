//使用卡牌后，确实是否可以使用，并发挥卡牌效果
function cardFunc(){
	let x = thing,uid = aimId;
	thing = null;
	aimId = null;
	tid = x.id.slice(2);
	let tidx = handCards.findIndex((tmp)=>tmp.id == tid);
	if(handCards[tidx].aim.indexOf(uid,0) == -1 || typeof handCards[tidx].func != "function"){
		reHandCards();
		return;
	}
	handCards[tidx].func(uid);
	handCards.splice(tidx,1);
	delHandCards(tid);
}

//确定3个角色后，组合本局的卡组
function cardsInit(){
	for(let i=1;i<4;i++){
		let id = roles[i].id;
		let tempCards = Object.assign([],cardStorage[id]);
		cards = cards.concat(tempCards);
		for(let j=0;j<roles[i].deck.length;j++){
			let card = tempCards[tempCards.findIndex((temp)=>temp.cid == roles[i].deck[j].id)];
			for(let k=0;k<roles[i].deck[j].count;k++){
				let cardCopy = Object.assign({},card);
				cardCopy.id = cardStaticDeck.length;
				cardCopy.locate = i;
				cardStaticDeck.push(cardCopy);
			}
		}
	}
	cardDeck = cardStaticDeck;
}

//手牌初始化 或抽至初始手牌上限
function handCardInit(){
	let nowHandCards = handCards.length;
	if(nowHandCards<initHandCards){
		let theCard,cardHtml='',num;
		for(let i =nowHandCards+1;i<=initHandCards;i++){
			//id='hc'+i;
			num = Math.floor(Math.random()*(cardDeck.length));
			theCard=cardDeck[num];//浅复制，对象里还有对象就不行
			cardDeck.splice(num,1);
			theCard.num=i;
			handCards.push(theCard);
			cardHtml +=`
				<div class="handCards card c`+theCard.locate+`" id="hc`+theCard.id+`">
					<div class="cost">`+theCard.cost+`</div>
					<div class="title">`+theCard.title+`</div>
					<div class="pic"></div>
					<div class="msg">`+theCard.msg+`</div>
				</div>`;
		}
		$("#handCard").append(cardHtml);
		reHandCards();
		updateCardCount();
	}else{
		console.log("已达到上限");
	}
}