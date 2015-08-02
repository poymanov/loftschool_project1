var app = (function() {

	//Инициализация модуля приложения
	var init = function() {
		_setUpListeners();
		_repairPlaceholder();
	};

	//Показать тултип
	var showQtip = function (id) {
		var el = $('#' + id),
			pos = el.attr('qtip-position');
			_createTooltip(el,pos);
	}

	//Создание тултипа
	var _createTooltip = function(el,position){
		if (position === 'right') {
			position = {
				my: 'left center',
				at: 'right center'
			};		
		}
		else {
			position = {
				my: 'right center',
				at: 'left center'
			};
		}

		el.qtip({
			content: {
				text: function(){
					return $(this).attr('qtip-content')
				}
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'keydown hideTooltip'
			},
			position: position,
			style: {
				classes: 'qtip-red qtip-rounded'
			}
		}).trigger('show');
	};

	//Универсальная процедура ajax-submit формы
	var _submitForm = function(curForm,file,parentBlock){
		$('#'+curForm).on('submit',function(e){
			e.preventDefault();

			var isError = false;
			//Проверка заполнения формы (берем только поля нужные для валидации)
			$('#'+curForm+' input:not(".no-validation"), textarea').each(function(index, el) {
				if($(el).val().length === 0) {
					showQtip($(this).attr('id'));
					isError = true;
				}
			});

			//Если возникли ошибки заполнения формы, то дальше процедура не идет

			if (isError) {
				return;
			}

			//Очищаем сообщение об ошибках формы
			_resetFormsErrors();

			var data = $(this).serialize(),
				url = '/app/'+file+'.php';


			$.ajax({
				url: url,
				type: 'post',
				dataType: 'json',
				data: data,
			})
			.fail(function(ans) {
				$('#'+parentBlock+' .msg-error .msg-error-text').text('На сервере произошла ошибка');
				$('#'+parentBlock+ ' .msg-error').show();
			})
			.done(function(ans) {
				//если все поля заполнены, сообщяем об этом пользователю
				if (ans.status === "OK") {
					$('.msg-success').bPopup();
				}
				else {
					//Выводим сообщение об ошибке в специальное поле на форме
					$('#'+parentBlock+' .msg-error .msg-error-text').text(ans.msg);
					$('#'+parentBlock+' .msg-error').show();
				}
				
			})
		})
	};

	//Прослушка событий приложения
	var _setUpListeners = function() {
		//Вызов попапа
		$('#new-work').on('click', function(e) {
			e.preventDefault();
			newPop = $('#block-upload').bPopup({
				transition: "slideDown",
				onClose: _onClosePopup
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
				$('.fake-input').trigger('hideTooltip');
			});
		});

		//Закрытие окна сообщения с ошибкой внутри формы
		$('.msg-error-close').on('click', function(e) {
			e.preventDefault();
			$(this).parent().hide();
		});

		//Форма добавления работы
		_submitForm('form-upload','server','block-upload');

		//Форма обратной связи
		_submitForm('feedback-form','server','feedback');

	};

	//Исправление placeholder в IE
	var _repairPlaceholder = function(){
		if(!Modernizr.input.placeholder){
			$('input, textarea').placeholder();
		}
	};

	//Сбрасываем все ошибки формы
	var _resetFormsErrors = function(){
		$('#block-upload .msg-error .msg-error-text').text('');
		$('#block-upload .msg-error').hide();
	};

	//Убираем все тултипы
	var _hideTooltips = function(){
		$('input').trigger('hideTooltip');
		$('textarea').trigger('hideTooltip');
	}

	//Процедуры после закрытия формы
	var _onClosePopup = function() {
		//Сбрасываем все ошибки и значения формы
		_resetFormsErrors();

		//Убираем все тултипы
		_hideTooltips();
	}
	return {
		init: init,
		showQtip: showQtip
	};

})();


app.init();




// Прячем тултипы по одному
		// $('#name').trigger('hideTooltip');
		// $('#email').trigger('hideTooltip');

		// Прячем все тултипы сразу 
		// $('.input').trigger('hideTooltip');