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
$(".box").mousedown(function(e){
	$(this).css("color","#DCDCDC");
	thing = this;
	down = true;
	var ts = $(this).css("top");
	var ls = $(this).css("left");
	tops =e.pageY -ts.substr(0,ts.length-2);
	lefts =e.pageX - ls.substr(0,ls.length-2);
});
$(".box").mouseup(function(e){
	$(this).css("color","white");
	down = false;
	upz=false;
});
//时间跳跃
$("#flash").click(function(){
	$(this).css("background","#a5a5ff");
	var a = this;
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
	var x = window.setInterval(function(){
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
$("#start").click(function(){
	$(".unit:nth-child(1)").css("background","black");
})
