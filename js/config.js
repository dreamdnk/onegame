//底层，重复功能

//常用元素的获取或申明
var role1=$("#role1")
	,role2=$("#role2")
	,role3=$("#role3")
	,role4=$("#role4")
	,role5=$("#role5")
	,role6=$("#role6");//6个角色位对应的节点
var roleDoms=[0,role1,role2,role3,role4,role5,role6];
var roles=[{mp:0,//魔力 在篝火休息后回复
	maxMp:0,
	sp:0,//耐力 每时刻回复1 每场战斗开始时为满
	maxSp:0,
	gold:100,//金币
	item:[]//遗物
	},undefined,undefined,undefined,undefined,undefined,undefined];//指向六个角色的初始对象，456应该是改变的

//常用函数 基础函数
//给与一个buff Buff名，来源，目标，层级
function buffAdd(name,who,aim,levels){
	if(roles[aim].buff[name] == undefined)
		roles[aim].buff[name]={level:0};
	roles[aim].buff[name].level = roles[aim].buff[name].level + levels;
}
//造成伤害的函数，同时只有一个目标 num:伤害量（最终）who:来源0-6 aim：目标1-6 type:类型0.流失1.攻击
function giveDamage(num,who,aim,type){
	if(typeof who == 'object'){
		who = who.locate;
	}
	let res = "普通";
	num = num + 0;
	//更改Hp
	roles[aim].hp = roles[aim].hp - num;
	roleDoms[aim].children(".health").html(roles[aim].hp);
	if(roles[aim].hp<=0){
		//执行死亡判断
		deathJudge(who,aim);
	}
	return res;
}
//判断是否死亡
function deathJudge(who,aim){
	if(roles[aim].hp<=0){
		console.log(aim+"dead");
		roles[aim] = undefined;
		if(roles[4] == undefined && roles[5] == undefined && roles[6] == undefined){
			console.log("win");
		}
	}
}
//中心计时器 
var mainTimer={
	go:function(time){//使时刻推进 time:流动的时刻，取大于0的整数
		
	},
	timeStroge:{//储存一个时刻的6个角色对象数据（存档读档）
	}
}
var dataCtrl={
	giveDefend:function(num,who,aim,type){
		if(typeof who == 'object'){
			who = who.locate;
		}
		roles[aim].dp = roles[aim].dp + num;
		roleDoms[aim].children(".defend").html(roles[aim].dp);
	},
	calculateDamgage:function(num,who,aim,type){
		if(typeof who == 'object'){
			who = who.locate;
		}
	}
}

//发送消息，动态添加和删除事件监听
function sendEvent(name,obj){
	let eve = new Event(name);
	eve.concat(obj);
	document.dispatchEvent(eve);
	console.log(eve);
}
function addListener(name,func){
	document.addEventListener(name,func);
}
function removeListener(name,func){
	document.removeEventListener(name,func);
}

//将一个角色的数据绑定到1-6的位置
function bandRole(name,type,locate){
	roles[locate] = Object.assign({},getRole(name,type));
	roles[locate]["locate"] = locate;
	roles[locate].buff = {};
	roles[locate].dp = 0;
	roles[locate].maxHp = roles[locate].hp;
	if(locate >= 3){
		roles[locate].action = {};
	}
}
//根据对应角色的对象数据设置节点图片 num为数组
function setRoleImg(num){
	for(let i=0;i<num.length;i++){
		let j = num[i];
		let x = roleDoms[j],y = roles[j];
		if(y !=undefined){
			if(y.img == "" || y.img == null){
				x.children(".disImg").html(y.name);
			}else{
				x.css("background","url("+y.img+")");
				x.css("background-size","100% 100%");
			}
			if(x.hasClass("hidden"))
				x.removeClass("hidden");
		}else{
			x.addClass("hidden");
		}
	}
}
//角色各项数据初始化 包括节点图片
function roleDomInit(num){
	for(let i=0;i<num.length;i++){
		let j = num[i];
		let x = roleDoms[j],y = roles[j],z = roles[j];
		if(y !=undefined){
			x.children(".health").html(y.hp);
			x.children(".defend").html(y.dp);
		}
	}
	setRoleImg(num);
	if(num[0]==1 && num[1]==2 && num[2]==3){//三个初始化
		roles[0].mp = roles[0].maxMp = roles[1].mp+roles[2].mp+roles[3].mp;
		roles[0].sp = roles[0].maxSp = Math.round((roles[1].sp+roles[2].sp+roles[3].sp)/2);
		$("#mp").html(roles[0].mp);
		$("#sp").html(roles[0].sp);
	}
}

//获取一个角色的对象
function getRole(name,type){
	let x =false;
	if(type == 1){
		x = mainRole[name];
	}else if(type == 2){
		x = supRole[name];
	}else if(type == 3){
		x = badRole[name];
	}
	return x;
}
//打印所有主角
function allarm(){
	for (var i in mainRole){
		console.log(i,"--",mainRole[i])
	}
}