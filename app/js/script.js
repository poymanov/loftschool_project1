var app = (function() {

	//Инициализация модуля приложения
	var init = function() {
		_setUpListeners();
		_repairPlaceholder();
	};

	//Прослушка событий приложения
	var _setUpListeners = function() {
		//Вызов попапа
		$('#new-work').on('click', function(e) {
			e.preventDefault();
			newPop = $('#block-upload').bPopup({
				transition: "slideDown",
				onClose: _resetFormUpload
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

		$('form').on('submit',function(e){
			e.preventDefault();

			var data = $(this).serialize();

			$.ajax({
				url: '/app/server.php',
				type: 'post',
				dataType: 'json',
				data: data,
			})
			.fail(function(ans) {
				$('#block-upload .msg-error').text('На сервере произошла ошибка').show();
			})
			.done(function(ans) {
				//если все поля заполнены, сообщяем об этом пользователю
				if (ans.status === "OK") {
					alert('Новая работа успешно добавлена');
				}
				else {
					//Выводим сообщение об ошибке в специальное поле на форме
					$('#block-upload .msg-error').text(ans.msg).show();
				}
				
			})
			
		})
	};

	//Исправление placeholder в IE
	var _repairPlaceholder = function(){
		if(!Modernizr.input.placeholder){
			$('input, textarea').placeholder();
		}
	};

	//Сбрасываем все ошибки и значения формы
	var _resetFormUpload = function(){
		$('#block-upload .msg-error').text('').hide();
	}

	return {
		init: init
	};

})();


app.init();