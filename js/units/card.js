var cardStorage,//所有的卡牌，按人物分类
cards=[],//根据所选人物，能获得的卡牌库
cardStaticDeck=[],//当局游戏组成的牌组
cardDeck=[],//当局战斗的牌组
handCards=[],//手牌
cardYard=[],//弃牌堆
cardBan=[],//除外牌堆
cardTemp=[],//本场战斗的临时卡
cardDistroy=[],//销毁牌堆
maxHandCards=10,//手牌上限
initHandCards=7,//每局战斗的初始手牌数
drawCards=2;//抽牌数
//aim:0无目标 1主角色 23 支援角色 456 敌对角色
//cid:卡牌id，不同卡牌唯一，同种卡牌cid相同
//id:唯一，从cards加入cardStaticDeck时赋予
cardStorage={
	tm01:[{cid:"tm01c1",title:"攻击",cost:1,img:"",msg:"测试用一，伤害",aim:"456",func:function(uid){giveDamage(5,1,uid,1);}}
		 ,{cid:"tm01c2",title:"护甲",cost:1,img:"",msg:"测试用一，护甲",aim:"123456",func:function(uid){dataCtrl.giveDefend(5,1,uid,1)}}
		 ,{cid:"tm01c3",title:"力量",cost:1,img:"",msg:"力量提升",aim:"123",func:function(uid){buffAdd("power",1,uid,2)}}],
	ts01:[{cid:"ts01c1",title:"伤害15",cost:1,img:"",msg:"测试用一，伤害",aim:"456",func:function(uid){giveDamage(15,this.locate,uid,1)}}],
	ts02:[{cid:"ts02c1",title:"测试s2",cost:1,img:"",msg:"测试用一，凑数",aim:"456",func:function(){console.log("?")}}]
};
cards=[];
