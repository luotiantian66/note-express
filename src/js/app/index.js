
require('less/index.less');
require('less/note.less')

var NoteManager = require('mod/note-manager.js').NoteManager;
var Event = require('mod/event.js');
var WaterFall = require('mod/waterfall.js');
var Note = require('mod/note.js')
var Toast = require('mod/toast.js').Toast

// $('.login').on('click',function(){
// 	window.location.href ='https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fauth%2Fgithub%2Fcallback&client_id=bedb43149de8f4336a60'
// 	// $.get('/auth/github').done(function(ret){
// 	// 	console.log(ret)
// 	// })

// 	console.log('log in ')
// 	// $.getJSON("http://localhost:9000/auth/github/?callbacks=?",function(arg){
//  //        console.log(arg)
//  //    });

// 	$.ajax({
// 		url:'/auth/github',
// 		type: 'get',
// 		dataType: 'jsonp',
// 		jsonpCallback: 'jsonpCb',
// 		success: function(data){
// 			console.log(data)
// 		}
// 	})
// })

$('.level').on('mouseover',function(){
	$('.levelDetails').addClass('active')
})
$('.level').on('mouseout',function(){
	$('.levelDetails').removeClass('active')
})
$('.order').on('mouseover',function(){
	$('.orderDetails').addClass('active')
})
$('.order').on('mouseout',function(){
	$('.orderDetails').removeClass('active')
})
$('.icon-top').on('click',function(){
	$('main').animate({scrollTop:0},300);
})
$('.icon-add').on('click',function(){
	// if(!isLogin) return
	if($('.icon-add').hasClass('logout')){
		Toast('请先登录')
		return
	} 
	NoteManager.add()
})

$('.levelDetails').on('click','li',function(){
	//console.log($(this).index())
	if($(this).index() == 0) {
		$('.ct').html('')
		NoteManager.load()
	}else {
		$('.ct').html('')
		NoteManager.sort($(this).index())
	}
})

$('.orderDetails').on('click','li',function(){
	var rule = {
		0:'createdAt',
		1:'createdAt',
		2:'level',
		3:'level'
	}
	var num = $(this).index()
	console.log('ordering')
	$('.ct').html('')
	if (num%2 == 0){
		NoteManager.order(rule[num])
	}else{
		NoteManager.orderDes(rule[num])
	}	
})


Event.on('waterfall',function(){
	WaterFall.init($('.ct'))
})

NoteManager.load();
// Event.on('addNote',function(data){
// 	Note.add(data)
// 	console.log('on adding note')
// })

