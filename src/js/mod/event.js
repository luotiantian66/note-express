var EventCenter = (function(){
	var events = {};
	
	function on(evt, handler){
		//console.log('on evt start')
		events[evt] = events[evt] || [];
		events[evt].push({
			handler: handler
		});
		//console.log(events)
	}
	function fire(evt, args){
		//console.log('fire evt start')
		//console.log(events)
		if(!events[evt]){
			return;
		}
		for(var i=0;i<events[evt].length;i++){
			events[evt][i].handler(args);
		}		//console.log('fire evt end')
	}
	return {
		on: on,
		fire: fire
	}
})();

module.exports = EventCenter;