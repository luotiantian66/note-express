require('less/note.less');

var Toast = require('./toast.js').Toast;
var Event = require('./event.js');

function Note(opts){
	this.initOpts(opts);
	this.createNote(opts);
	this.bindEvent();
	
}

Note.prototype = {
	defaultOpts: {
		id: '',
		$ct: $('.ct'),
		level: '',
		context:'',
		time:''
	},
	initOpts:function(opts){
		//console.log(opts)
		this.opts = $.extend({}, this.defaultOpts, opts||{});
		if(this.opts.id){
			this.id = this.opts.id;
		}
	},
	createNote:function(opts){
		var tpl = `<div class="item">
				<div class="title">
					<span class="date">2018年1月18日</span>
					<span class="iconfont icon-close"></span>
				</div>
				<div class="content" contenteditable="true">
					这是一个便利贴，加油做毕设。啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
				</div>
				<div class="starlevel">
					<span class="iconfont icon-star"></span>
					<span class="iconfont icon-star"></span>
					<span class="iconfont icon-star"></span>
				</div>
				
			</div>`
		this.$note = $(tpl)
		// this.$date = new Date()
		// console.log(this.$date)
		var _this = this
		//console.log(this.opts.time.slice(0,10))
		this.$note.find('.date').html(this.opts.time)
		this.$note.find('.content').html(this.opts.context)
		this.opts.$ct.append(this.$note)
		//console.log(opts.level)
		for (var n = 0; n<=opts.level; n++) {
			//console.log(this.$note.find('.starlevel .iconfont').eq(n))
			this.$note.find('.starlevel .iconfont').eq(n).addClass('active')
		}	
		
		//console.log(this.$note.find('.starlevel .iconfont'))
		//this.$note.find('.starlevel iconfont')
		//console.log('creating node')
		Event.fire('waterfall')
	},
	bindEvent:function(){
		var _this = this,
		$note = this.$note,
		$noteCt = $note.find('.content'),
		$starCt = $note.find('.starlevel')
		$delete = $note.find('.icon-close');
		$delete.on('click',function(){
			_this.delete()
		})

		$noteCt.on('focus',function(){
			$noteCt.data('ct',$noteCt.html())
		}).on('blur', function(){
			if($noteCt.html() !== $noteCt.data('ct')){
				_this.editMsg($noteCt.html())
			}
		})

		$starCt.on('click','.iconfont',function(){
			// console.log($(this))
			// console.log($(this).parent().find($('.iconfont')))
			index = $(this).index()
			for (var n = 0; n<=index; n++) {
				$(this).parent().find($('.iconfont')).eq(n).addClass('active')
			}	
			for(var m=index+1;m<=$('.newlevel .iconfont').length;m++){
				$(this).parent().find($('.iconfont')).eq(m).removeClass('active')
			}
			_this.editLevel($(this).index())

		})
	},
	editMsg: function(msg){
		var _this = this 
		$.post('/api/notes/editMsg', {
			note: msg,
			id: this.id
		}).done(function(ret){
			if(ret.status === 0) {
				console.log('update success')
			}else {
				console.log(ret.errorMsg)
			}
		})
	},
	editLevel: function(level){
		var _this = this 
		$.post('/api/notes/editLevel', {
			level:level,
			id: this.id
		}).done(function(ret){
			if(ret.status === 0) {
				console.log('update success')
			}else {
				console.log(ret.errorMsg)
			}
		})
	},
	add: function(level,msg){
		//console.log('adding')
		var _this = this
		$.post('/api/notes/add', {
			level:level,
			note: msg
		}).done(function(ret){
			//console.log(ret)
			//console.log(msg,lel)
			if(ret.status ===0){
				//_this.id = ret.data.id
				Toast('添加成功')

			}else {
				Toast(ret.errorMsg)
			}
		})
		
	},
	delete:function(){
		var _this = this 
		$.post('/api/notes/delete',{id: this.id})
			.done(function(ret){
				if(ret.status === 0){
					Toast('删除成功')
					_this.$note.remove()
					Event.fire('waterfall')
				}else{
					Toast(ret.errorMsg)
				}
			})

	}
};

module.exports.Note = Note;





// var Note = (function(){
// 	var $noteCt = $('.newcontent')
// 	var defaultOpts = {
// 		id: '',
// 		$ct: $('.ct'),
// 		context:''
// 	}	
// 	var opts

// 	function initOpts(opts){
// 		opts = $.extend({}, defaultOpts, opts||{});
// 		if(opts.id){
// 			defaultOpts.id = opts.id;
// 		}
// 	}
// 	function add(msg){
// 		//console.log('adding')
// 		var _this = this
// 		$.post('/api/notes/add', {note: msg})
// 			.done(function(ret){
// 				if(ret.status ===0){
// 					_this.id = ret.data.id
// 					Toast('add success')
// 				}else {
// 					Toast(ret.errorMsg)
// 				}
// 			})
// 	}
// 	function createNote(){
// 		var tpl = `<div class="item">
// 				<div class="title">
// 					<span class="date">2018年1月18日</span>
// 					<span class="iconfont icon-close"></span>
// 				</div>
// 				<div class="content">
// 					这是一个便利贴，加油做毕设。啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
// 				</div>
// 				<div class="starlevel">
// 					<span class="iconfont icon-star"></span>
// 					<span class="iconfont icon-star"></span>
// 					<span class="iconfont icon-star"></span>
// 				</div>
// 				<div class="state">
// 					<span>修改</span>
// 				</div>
// 			</div>`
// 		var $note = $(tpl)
// 		//this.$date = new Date()
// 		// this.$note.find('.date').html(function(){
// 		// 	return this.$date.getYear() + '年' + this.$date.getMonth() + '月' + this.$date.getDate() + '日'
// 		// })
// 		//$note.find('.content').html(opts.context)
// 		opts.$ct.append($note)
// 		Event.fire('waterfall')
// 	}
	
// })();

