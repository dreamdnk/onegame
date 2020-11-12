var thing;
var down = false;
var topz = 0;
var upz = false;
var day = 0;
var timeLess = 60;
var tops=0;
var lefts=0;
$(function(){
	dayTime(3);
});
$(document).ready(function(){
	//检测鼠标移动，拖拽窗口
	$(document).mousemove(function(e){
		$("#1 span").text(e.pageX+"-"+e.pageY);
		if(down){
			$(thing).css("top",e.pageY-tops);
			$(thing).css("left",e.pageX-lefts);
			if(!upz){
				topz = topz+1;
				upz = true;
			}
			$(thing).css("z-index",topz);
		}
	});
});
// $(".box").mousedown(function(e){
// 	if($(this).hasClass("battle"))
// 		return;
// 	$(this).css("color","#DCDCDC");
// 	thing = this;
// 	down = true;
// 	let ts = $(this).css("top");
// 	let ls = $(this).css("left");
// 	tops =e.pageY -ts.substr(0,ts.length-2);
// 	lefts =e.pageX - ls.substr(0,ls.length-2);
// 	console.log("xxx")
// });
// $(".box").mouseup(function(e){
// 	$(this).css("color","white");
// 	down = false;
// 	upz=false;
// });
$(document).on('mousedown','.box',function(e){
	if($(this).hasClass("battle"))
		return;
	$(this).css("color","#DCDCDC");
	thing = this;
	down = true;
	let ts = $(this).css("top");
	let ls = $(this).css("left");
	tops =e.pageY -ts.substr(0,ts.length-2);
	lefts =e.pageX - ls.substr(0,ls.length-2);
	console.log("xxx")
});
$(document).on('mouseup','.box',function(e){
	$(this).css("color","white");
	down = false;
	upz=false;
})
//时间跳跃
$("#flash").click(function(){
	$(this).css("background","#a5a5ff");
	let a = this;
	setTimeout(function(){
		$(a).css("background","#34353D")
	},150);
	if(timeLess>20){
		timeLess = timeLess-20;
	}else{
		timeLess = 1;
	}
})
//计时器
function dayTime(times){
	timeLess = times;
	let x = window.setInterval(function(){
		timeLess--;
		$("#4 span").text(timeLess);
		if(timeLess<=0){
			clearInterval(x);
			day = day+1;
			$("#3 span").text("第"+day+"天");
			dayTime(60);
		}
	},1000);
};
//开始按钮显示隐藏主要界面
$("#start,#start2").click(function(){
	//$(".unit:nth-child(1)").css("background","black");
	if($("#keyGround").hasClass("hidden")){
		$("#keyGround").removeClass("hidden");
	}else{
		$("#keyGround").addClass("hidden");
	}
})

//对象数值的监听
var data={xx:1};
Object.defineProperty(data,'xx',{
	get:function(){
		console.log(xx,"get")
		return xx;
	},
	set:function(value){
		xx=value;
		console.log(value,"set")
	}
})
function tigg(){
	//data.xx = 1;
	//console.log(data.xx)
	var e = new Event("item");
	e.s = 2;
	document.dispatchEvent(e);
	console.log(e);
	// setTimeout(function(){
	// 	console.log("++")
	// },1000)
	// getCall(getcon)
	// console.log("--")
	let x = getcon;
	console.log(x(),"---");
	
}
//事件监听和派发事件
document.addEventListener("item",tigger);
function tigger(e){
	console.log(e.s);
	e.s = e.s + 3;
}
document.addEventListener("item",tigger2);
function tigger2(e){
	console.log(e.s);
	e.s = e.s * 2;
}

//callback
function getCall(callback){
	console.log("111");
	callback();
}
function getcon(a){
	console.log("?")
	return 1;
}

//say.call("11","22","33")
//call方法
function say(name1,name2){
	console.log(this,name1,name2);
}

//js中的构造函数
var stu1 = new stu("xl","23");
function stu(name,age){
	this.name = name;
	this.age = age;
	console.log(this,"?")
	//对象方法
	this.walk=function(){
		console.log("walk")
	}
}
//原型方法   原型方法不会重写对象方法
stu.prototype.sayhello=function(){
	console.log(this,"!")
}
stu.prototype.walk=function(){
	console.log("not walk")
}
stu.walk=function(){
	console.log("on walk")
}
//类方法 添加在stu这个实例上(window)
stu.run=function(){
	console.log("run");
}
stu.walk();
//在对象上可以重写方法(本质是外层方法覆盖内层proto)
stu1.walk=function(){
	console.log("yes walk")
}
//setTimeout(function(){stu1.walk()},100)

console.log(stu.prototype);
