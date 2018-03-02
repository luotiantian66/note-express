var express = require('express')
var router = express.Router()
var Note = require('../model/note.js')

router.get('/notes',function(req,res,next){
	//console.log('get~')
	if(!req.session.user) {
		return
	}

	Note.findAll({where:{uid:req.session.user.id}}).then((notes) => {
		//console.log(notes)
		res.send({status:0, data:notes})
	})
})

router.post('/notes/add',function(req,res,next){
	if(!req.session.user) {
		return res.send({status: 1, errorMsg:'请先登录'})
	}

	var uid = req.session.user.id
	var note = req.body.note;
	var lel = req.body.level;
	//console.log(req.body)
	
	// console.log(req)
	//console.log(req.body.level)
	Note.create({ level:lel,text:note,uid:uid}).then(() => {
		res.send({status:0})
		//console.log(note)
	}).catch(() => {
		res.send({status:1 , errorMsg:'数据库出错'})
	})
	//console.log('adding...')
})

router.post('/notes/editMsg',function(req,res,next){
	if(!req.session.user) {
		return res.send({status: 1, errorMsg:'请先登录'})
	}
	Note.update({text: req.body.note},{where:{id:req.body.id}}).then(() => {
		//console.log(arguments)
		res.send({status:0})
	}).catch(() => {
		res.send({status:1, errorMsg:'修改失败'})
	})
})

router.post('/notes/editLevel',function(req,res,next){
	if(!req.session.user) {
		return res.send({status: 1, errorMsg:'请先登录'})
	}
	Note.update({level: req.body.level},{where:{id:req.body.id}}).then(() => {
		//console.log(arguments)
		res.send({status:0})
	}).catch(() => {
		res.send({status:1, errorMsg:'修改失败'})
	})
})

router.post('/notes/delete',function(req,res,next){
	if(!req.session.user) {
		return res.send({status: 1, errorMsg:'请先登录'})
	}
	Note.destroy({where:{id: req.body.id}}).then(() => {
		res.send({status:0})
	}).catch(() => {
		res.send({status:1, errorMsg:'删除失败'})
	})
})

router.post('/notes/sort',function(req,res,next){
	Note.findAll({where:{level:req.body.level}}).then((notes) => {
		//console.log(notes)
		res.send({status:0, data:notes})
	})
})

router.post('/notes/order',function(req,res,next){
	console.log(req.body.order)
	Note.findAll({order: [[req.body.order]]}).then((notes) => {
		//console.log(notes)
		res.send({status:0, data:notes})
	})
	// Note.findAll({
	// 	order: [['level','DESC']]
	// }).then((notes) => {
	// 	console.log('ordering')
	// 	console.log(notes)
	// 	//res.send({status:0, data:notes})
	// })
})

router.post('/notes/orderDes',function(req,res,next){
	// console.log(req.body.order)
	// Note.findAll({order: [[req.body.order]]}).then((notes) => {
	// 	//console.log(notes)
	// 	res.send({status:0, data:notes})
	// })
	Note.findAll({
		order: [[req.body.order,'DESC']]
	}).then((notes) => {
		//console.log('ordering')
		//console.log(notes)
		res.send({status:0, data:notes})
	})
})

module.exports = router;