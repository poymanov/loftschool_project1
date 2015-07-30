var app = (function() {

	//Инициализация модуля приложения
	var init = function() {
		_setUpListeners();
		_repairPlaceholder();
	};

	//Прослушка событий приложения
	var _setUpListeners = function() {
		//Вызов попапа
		$('#new-work').bind('click', function(e) {
			e.preventDefault();
			newPop = $('#block-upload').bPopup({
				transition: "slideDown"
			});
		});

		//Выбор файла-изображения
		$('#form-file').change(function() {
			$(this).each(function() {
				var name = this.value;
				reWin = /.*\\(.*)/;
				var fileTitle = name.replace(reWin, "$1");
				reUnix = /.*\/(.*)/;
				fileTitle = fileTitle.replace(reUnix, "$1");
				$('.fake-input').attr('placeholder', fileTitle);
				$('.fake-input').attr('value', fileTitle);
			});
		});
	};

	//Исправление placeholder в IE
	var _repairPlaceholder = function(){
		if(!Modernizr.input.placeholder){
			$('input, textarea').placeholder();
		}
	}

	return {
		init: init
	};

})();


app.init();