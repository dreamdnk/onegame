var hp;
var mp;
var soul;
var speed;
var defend;
var money;
var time;
var rearm ={
		littleBoy:{
			hp:12,
			mp:10,
			soul:5,
			spedd:2,
			defend:2,
			money:10,
			time:2
		},
		littleArcher:{
			hp:22,
			mp:10,
			soul:15,
			spedd:2,
			defend:2,
			money:20,
			time:2
		}
	}
function getarm(name){
	var x = rearm[name];
	return x;
}
function allarm(){
	for (var i in rearm){
		console.log(i,"--",rearm[i])
	}
}