var thing = null; //指鼠标按下，选中的卡牌
var down = false;
var topz = 0;
var tops=0;
var lefts=0;
var aimId = null;//指鼠标悬浮的单位

$("#give").click(function(){
	//测试用
	bandRole("tm01",1,1);
	bandRole("ts01",2,2);
	bandRole("ts02",2,3);
	groundInit();
	//cards = cards.concat(cardStorage["tm01"],cardStorage["ts01"],cardStorage["ts02"]);
	handCardInit();
});

$(document).ready(function(){
	//检测鼠标移动
	let x,y,d,l,n //宽 高 角度 长度 角度
	$(document).mousemove(function(e){
		if(down){
			//指示线跟随鼠标移动
			y = tops - e.pageY;
			if(y>0){
				x = e.pageX - lefts;
				n = Math.atan(y/x)*180/Math.PI;
				d = n>0?90-n:-n+270;
				l = Math.sqrt(x*x+y*y);
				$("#arrow").css("transform","rotate("+d+"deg)");
				$("#arrow").css("left",e.pageX+3);
				$("#arrow").css("top",e.pageY+3);
				$("#arrow").css("height",l);
			}
			//移动一定高度后，视为对无目标释放。
			if(e.pageY<300 && aimId == null){
				aimId = 0;
			}else if(aimId == 0){
				aimId = null;
			}
		}
	});
});
//监测鼠标移动到目标上
$(document).on('hover','.unit',function(e){
	if(e.type == "mouseenter"){
		aimId = $(this).children(".unidId").html();
		//console.log("鼠标进入");
	}
	if(e.type == "mouseleave"){
		aimId = null;
		//console.log("鼠标离开");
	}
})
$(document).on('mousedown','.handCards',function(e){
	thing = this;
	$(thing).css("z-index",handCards.length+2);
	tops =e.pageY;
	lefts =e.pageX;
	$("#arrow").removeClass("hidden");
	down = true;
});
//松开鼠标
$(document).on('mouseup',function(e){
	if(thing == null)
		return;
	down = false;
	$("#arrow").addClass("hidden");
	$("#arrow").css("height","0px");
	if(thing != null){
		cardFunc();//在cardMain中
	}else{
		reHandCards();
	}
})
//手牌位置复位
function reHandCards(){
	let now = handCards.length;
	let l = 100-now*6;
	for(let i=1;i<=now;i++){
		let card = $("#hc"+handCards[i-1].id);
		card.css("z-index",i);
		card.css("left",i*l-l*now*0.5-l);
		//card.css("top",8*(Math.abs(now/2-i)));
		card.css("transform","rotate("+(4*(i-1)-2*now)+"deg)");
		//"style="left:`+i*100+`px;top:`+12*(Math.abs(maxHandCards/2-i))+`px;transform:rotate(`+deg+`deg)"
	}
}
//删除一张手牌的显示
//way:代表消失方式
function delHandCards(num,way){
	$("#hc"+num).remove();
	reHandCards();
}

//初始化,每次游戏第一次进入对局时
//每次开始游戏时，先进行一场默认战斗，再进入地图界面
function groundInit(){
	//玩家角色与卡组初始化
	roleDomInit([1,2,3]);
	cardsInit();
	//测试
	bandRole("titan01",3,5);
	roleDomInit([5]);
	//战斗初始化
}

//这里展示3种库的牌
function cardShower(num){
	switch(num){
		case 1:
			//
			break;
		case 2:
			//
			break;
		case 3:
			//
			break;
		default:return;
	}
	$("#cardShower").removeClass("hidden");
}
function cardShowerClose(){
	$("#cardShower").addClass("hidden");
}
//牌堆卡牌数量显示
function updateCardCount(){
	$("#cardDeck").html(cardDeck.length);
	$("#cardYard").html(cardYard.length);
	$("#cardBan").html(cardBan.length);
}

//结束按钮重新抽卡
function reDraw(){
	//丢弃所有手牌，抽至初始手牌上限，耗时3time
	handCardInit();
}