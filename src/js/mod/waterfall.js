var WaterFall = (function(){
	var $ct;
	var item;

	function paint($c){
		$ct = $c;
		//console.log('painting')
		$item = $ct.children();

		var itemWidth = $item.outerWidth(true);
		var colNum = Math.floor($ct.width()/itemWidth);
		var colHeight = [];
		var gap = ($ct.width()-colNum*itemWidth)/(colNum-1);

		for (i=0;i<colNum;i++){
			colHeight[i] = 0;
		}

		$item.each(function(){

			var minHeight = colHeight[0]
			var minIndex = 0
			for(var i=0;i<colNum;i++){
				if(colHeight[i]<minHeight){
					minHeight=colHeight[i]
					minIndex = i
				}		
			}
			$(this).css({
				'top': minHeight,
				//'left': minIndex * this.$itemWidth,
				'left': (minIndex)*(gap+itemWidth)

			})
			colHeight[minIndex] = colHeight[minIndex] + $(this).outerHeight(true)
		});
	}

	$(window).on('resize',function(){
		paint($ct);
	})

	return {
		init: paint
	}
})();

module.exports = WaterFall


