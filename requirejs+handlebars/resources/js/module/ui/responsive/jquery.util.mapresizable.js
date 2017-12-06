define(['jquery', 'imageOriginalSize'], function($, imageOriginalSize) {

	/**
	 * Window 창에 따라 Map 좌표 재계산.
	 * @require {Class} jQuery
	 * @require {Class} ImagePreload
	 * @require {Function} imageOriginalSize
	 * @param {String} mapSelector  - 적용할 셀럭터 지정. (#id, .class, etc)
	 * @returns {*}
	 */
	function mapResizable(mapSelector) {

		function resize() {

			var $map = $(this),
				$area = $map.find('area'),
				$image = $('[usemap="#' + $map.attr('name') + '"]'),
				ratio = $image.width() / $map.data('ORIGIN_WIDTH');

			for (var k = 0, z = $area.length; k < z; k++) {
				var coords = $area.eq(k).attr("coords").split(', ');

				for (var i = 0; i < coords.length; i++) {
					var nums = coords[i].split(',');

					for (var j = 0; j < nums.length; j++) {
						nums[j] = parseFloat(nums[j] * ratio).toFixed(2);
					}

					coords[i] = nums.join(',');
				}
				$area.eq(k).attr("coords", coords.join(","));
			}

			$map.data('ORIGIN_WIDTH', $image.width());
		}

		function revertMatrix() {
			var $map = $(this),
				$area = $map.find('area');

			for (var i = 0, j = $area.length; i < j; i++) {
				$area.eq(i).attr('coords', $area.eq(i).data('ORIGIN_MATRIX'))
			}
		}

		function initialize() {

			var $map = $(this),
				$area = $map.find('area'),
				$image = $('[usemap="#' + $map.attr('name') + '"]'),
				ev = $._data(this, 'events');

			if (ev && ev.revertMatrix) {
				console.error('이 메세지는 Selector 가 중첩 되었을 때에 발생 합니다. 중복 호출 되는 Selector가 있는지 확인이 필요합니다.', this);
				return;
			}

			$map.on('setResize', resize);
			$map.on('revertMatrix', revertMatrix);

			for (var k = 0, z = $area.length; k < z; k++) {
				$area.eq(k).data({
					'ORIGIN_MATRIX': $area.eq(k).attr('coords')
				});
			}

			for (var i = 0, j = $image.length; i < j; i++) {
				imageOriginalSize($image.eq(0).get(0), function () {
					$map.data({
						'ORIGIN_WIDTH': parseInt($image.attr('orgwidth'), 10)
					}).trigger('setResize');
				});
			}


			$(window).on('resize.mapResizable', function () {
				$map.trigger('setResize');
			});
		}

		return this.each(initialize);
	}

	$.fn.mapResizable = mapResizable;
});
