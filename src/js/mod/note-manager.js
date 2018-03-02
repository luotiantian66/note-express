var Toast = require('./toast.js').Toast;
var Note = require('./note.js').Note;
var Event = require('./event.js');

var NoteManager = (function(){

	function load(){
	$.get('/api/notes')
		.done(function(ret){
			//console.log(ret.data)
			if(ret.status == 0){
				$.each(ret.data, function(idx,article){
					var createDate = article.createdAt.slice(0,4) + '年' + article.createdAt.slice(5,7) + '月' + article.createdAt.slice(8,10) + '日'
					new Note({
						id:article.id,
						level: article.level,
						context: article.text,
						time: createDate
					});
				});
				Event.fire('waterfall');
			}else{
				Toast(ret.errorMsg);
			}
		})
		.fail(function(){
			Toast('网络异常');
		})	
		// console.log('fire waterfall')
		// Event.fire('waterfall');
	}	

	function add(){
		var i = 1
		var index
		//var Clk = false
		$('.shelter').css('display','block')
		$('.box').css('display','block')
		$('.box .icon-close').on('click',function(){
			$('.shelter').css('display','none')
			$('.box').css('display','none')
		})

		// $('.newlevel .iconfont').on('mouseover',function(){
		// 	var indexOver = $(this).index()-1
		// 	//console.log(index)
		// 	for (var n = 0; n<=indexOver; n++) {
		// 		$('.newlevel .iconfont').eq(n).addClass('active')
		// 	}	
		// 	for(var m=indexOver+1;m<=$('.newlevel .iconfont').length;m++){
		// 		$('.newlevel .iconfont').eq(m).removeClass('active')
		// 	}
		// }).on('mouseout',function(){
		// 	if(Clk==true) return
		// 	$('.newlevel .iconfont').removeClass('active')
		// })
		//给星星加颜色
		$('.newlevel').off('click').on('click','.iconfont',function(){
			//Clk = true
			index = $('.newlevel .iconfont').index(this)
			//console.log(index)
			for (var n = 0; n<=index; n++) {
				$('.newlevel .iconfont').eq(n).addClass('active')
			}	
			for(var m=index+1;m<=$('.newlevel .iconfont').length;m++){
				$('.newlevel .iconfont').eq(m).removeClass('active')
			}
		})
		
		$('.box .addbtn').off('click').on('click',function(){
			//添加新便签，将数据交给后台
			// if(!req.session.user) {
			// 	Toast('请先登录')
			// 	return
			// }
			var nowDate = new Date()
			var year = nowDate.getFullYear()
			var month =nowDate.getMonth()<9 ?'0'+ (nowDate.getMonth()+1) +'': nowDate.getMonth()+1
			var day = nowDate.getDate()<9? '0'+nowDate.getDate():nowDate.getDate()
			var ctdate = year + '年' +month + '月' + day + '日' + ''
			console.log(ctdate)
 			if($('#inputInfo').val()=='') {
				Toast('请输入内容')
				return
			}
			if(!$('.newlevel .iconfont').hasClass('active')){
				Toast('请点击星星选择等级')
				return
			}
			var Opt = {
				id: '',
				$ct: $('.ct'),
				level: index,
				context:$('#inputInfo').val(),
				time:ctdate
			}
			console.log(Opt)
			var tep = new Note(Opt)
			//tep.opts.context = $('#inputInfo').val()
			tep.add(index,$('#inputInfo').val())
			//console.log(index)
			//console.log(tep)	
			//tep = {}
			//console.log(tep)
			//Event.fire('addNote',$('.newcontent').html())
			//console.log('fire adding')
			$('.shelter').css('display','none')
			$('.box').css('display','none')
			
			$('#inputInfo').val('')
			$('.newlevel .iconfont').removeClass('active')
		})

		$('.box .icon-close').on('click',function(){
			$('#inputInfo').val('')
			$('.newlevel .iconfont').removeClass('active')
			$('.shelter').css('display','none')
			$('.box').css('display','none')
		})
	
	}

	function sort(idx) {
		$.post('/api/notes/sort',{
			level:idx-1
		}).done(function(ret){
			// console.log(ret.data)
			// console.log(ret.data.length)
			if(ret.status == 0){
				//console.log('success')
				if(ret.data == 0) {
					Toast('未找到结果')
				}
				
				$.each(ret.data, function(idx,article){
					var createDate = article.createdAt.slice(0,4) + '年' + article.createdAt.slice(5,7) + '月' + article.createdAt.slice(8,10) + '日'
					new Note({
						id:article.id,
						level: article.level,
						context: article.text,
						time: createDate
					})
				})
				Event.fire('waterfall');
			}
		})
	}

	function order(idx) {
		$.post('/api/notes/order',{
			order: idx
		}).done(function(ret){
			// console.log(ret.data)
			// console.log(ret.data.length)
			if(ret.status == 0){
				//console.log('success')
				$.each(ret.data, function(idx,article){
					var createDate = article.createdAt.slice(0,4) + '年' + article.createdAt.slice(5,7) + '月' + article.createdAt.slice(8,10) + '日'
					new Note({
						id:article.id,
						level: article.level,
						context: article.text,
						time: createDate
					})
				})
				Event.fire('waterfall');
			}
		})
	}

	function orderDes(idx){
		$.post('/api/notes/orderDes',{
			order: idx
		}).done(function(ret){
			// console.log(ret.data)
			// console.log(ret.data.length)
			if(ret.status == 0){
				//console.log('success')
				$.each(ret.data, function(idx,article){
					var createDate = article.createdAt.slice(0,4) + '年' + article.createdAt.slice(5,7) + '月' + article.createdAt.slice(8,10) + '日'
					new Note({
						id:article.id,
						level: article.level,
						context: article.text,
						time: createDate
					})
				})
				Event.fire('waterfall');
			}
		})
	}

	return {
		load: load,
		add: add,
		sort: sort,
		order: order,
		orderDes: orderDes
	}
})();

module.exports.NoteManager = NoteManager


