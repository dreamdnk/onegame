var hp,mp,sp,ap,dp,cards=[],items=[];
var Marm ={
		tongYu:{
			name:"桐羽",
			msg:"剑士",
			img:"../../img/dftman.jpg",
			hp:12,
			mp:1,
			soul:5,
			act:4,
			cards:[],
			items:[]
		},
		weiXin:{
			name:"唯心",
			msg:"元素",
			img:"",
			hp:5,
			mp:50,
			soul:5,
			act:1,
			cards:[],
			items:[]
		}
	}
var Sarm={
	tongRen:{
		name:"铜人",
		msg:"剑士",
		img:"",
		hp:5,
		mp:1,
		soul:5,
		act:2,
		cards:[],
		items:[]
	},
	weiXin1:{
		name:"唯心(初)",
		msg:"元素",
		img:"",
		hp:10,
		mp:50,
		soul:5,
		act:2,
		cards:[],
		items:[]
	}
}
function getarm(name){
	var x = Marm[name];
	return x;
}
function allarm(){
	for (var i in Marm){
		console.log(i,"--",rearm[i])
	}
}