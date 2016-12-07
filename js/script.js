$(document).ready(function() {


    var _popup = $('#popup-box');

    var app = {
        dom: {
            overlay: $('#blackout'),
            popup: _popup,
            list: $('#user-table-list'),
            showPopupBtn: $('.btn-action'),
            closePopupBtn: _popup.find('.close-popup-action'),
            saveEditBtn: _popup.find('.save-edition-action'),
            sendPopupBtn: _popup.find('.send-popup-action'),
            cancelPopupBtn: _popup.find('.cancel-popup-action'),
            countrySelect: _popup.find('.select-action-js'),
            checkboxAll: $('#ckb-all'),
            deleteAllBtn: $('.main-button'),
            showMessageBtn: $('.show-message-js')
        }
//        users: [
//            {
//                "id": "260b295e-e5f6-fc28-9017-e6c8bac9f7a5",
//                "name": "Александр",
//                "surname": "Иванов",
//                "age": "29",
//                "birth": "19-01-1987",
//                "message": "Запрос авторизации",
//                "delivery": true,
//                "male": true,
//                "country": "5"
//            },
//
//            {
//                "id": "270b295e-e5f6-fc28-9017-e6c8bac9f7a5",
//                "name": "Мария",
//                "surname": "Петрова",
//                "age": "30",
//                "birth": "06-03-1986",
//                "message": "Запрос авторизации",
//                "delivery": true,
//                "male": false,
//                "country": "1"
//            },
//            {
//                "id": "270b295e-e5f6-fc28-8611-e6c8bac9f7a5",
//                "name": "Василий",
//                "surname": "Королёв",
//                "age": "36",
//                "birth": "06-03-1980",
//                "message": "Запрос авторизации",
//                "delivery": true,
//                "male": false,
//                "country": "4"
//            },
//            {
//                "id": "270b295e-e5f6-fc28-4751-e6c8bac9f7a5",
//                "name": "Екатерина",
//                "surname": "Сомова",
//                "age": "26",
//                "birth": "06-03-1990",
//                "message": "Запрос авторизации",
//                "delivery": true,
//                "male": false,
//                "country": "2"
//            },
//            {
//                "id": "270b295e-e5f6-fc28-6912-e6c8bac9f7a5",
//                "name": "Елена",
//                "surname": "Воронина",
//                "age": "20",
//                "birth": "06-03-1996",
//                "message": "Запрос авторизации",
//                "delivery": true,
//                "male": false,
//                "country": "3"
//            }
//
//        ]
    };
    app.users = [];


    var usersLSString = localStorage.getItem('users');
    var usersLS = JSON.parse(usersLSString);
    usersLS ? renderAllUsers(usersLS) : getUsersJson();

    function getUsersJson() {
        $.ajax({
            url: '/json/users.json',
            dataType: 'json',
            success: function(data) {
                app.users =  data;

                localStorage.setItem('users', JSON.stringify(data));
                renderAllUsers(data);
            }
        }).success(function() {

            })

    }


// render users

    function renderAllUsers(users) {
        var result = '';
        for (var i = 0; i < users.length; ++i) {
            result = result + renderUser(users[i], true);
        }
        app.dom.list.append(result);
        if (localStorage.getItem('users') == null) {
            localStorage.setItem('users', JSON.stringify(users))
        }
    }



    var browserHeight = $(document).height();

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

//setPopupHeight

    function setPopupHeight(DomObj){
        var popupHeight = app.dom.popup.outerHeight();

        if (popupHeight > browserHeight) {

            DomObj.popup.css({
                marginTop: 0,
                top: '10%'
            });

        } else {
            DomObj.popup.css({
                marginTop: '-' + popupHeight/2 + 'px',
                top: '50%'
            });

        }
        app.dom.popup.css({
            marginTop: '-' + popupHeight/2 + 'px',
            top: '50%'
        });
    }

//Close popup

    function closePopup() {
        app.dom.overlay.fadeOut(1000);
        app.dom.popup.fadeOut( 300, function() {
            cleanPopupAllFields();
        });
    }

//getInfoUser

    function getInfoUser(popup, id) {
        var nameInput =  popup.find('.user-name-action'),
            surnameInput =  popup.find('.user-surname-action'),
            ageInput =  popup.find('.user-age-action'),
            birthInput = popup.find('.user-birth-action'),
            messageInput =  popup.find('.user-message-action'),
            countryInput = popup.find('.select-action-js'),
            deliveryInput = popup.find('.delivery-action'),
            genderInput = popup.find('.gender-action');



        var name = nameInput.val(),
            surname = surnameInput.val(),
            age = ageInput.val(),
            birth = birthInput.val();
            message = messageInput.val(),
            delivery = deliveryInput.prop('checked'),
            gender = genderInput.prop('checked'),
            country = countryInput.val();


        var _id = id ? id : guid();

        return {
            id: _id,
            name: name,
            surname: surname,
            age: age,
            birth: birth,
            message: message,
            delivery: delivery,
            male: gender,
            country: country
        }

    }

    function renderUser(_user, withWrapper) {
        var gender = 'мужчина';
        var delivery = 'да';
        var country = '';

        if (!_user.delivery) {
           delivery = 'нет';
        }
        if (!_user.male) {
            gender = 'женщина';
        }

        switch (_user.country) {
            case '1':
                country = 'Москва';
                break;
            case '2':
                country = 'Санкт-Петербург';
                break;
            case '3':
                country = 'Калуга';
                break;
            case '4':
                country = 'Ростов-на-Дону';
                break;
            case '5':
                country = 'Саратов';
                break;
        }


        var dataStr =   '<div class="data-box">' +
                            '<span>' +
                                '<span class="custom-checkbox">' +
                                    '<input class="checkbox-action-js" type="checkbox" id="' + _user.id  + '"' + '/>' +
                                    '<label' + ' for="' + _user.id + '"><i class="icon-checkmark"></i></label>' +
                                '</span>' +
                            '</span>' +
                            '<span>' +_user.name + '</span>' +
                            '<span>'+ _user.surname + '</span>' +
                            '<span>' + _user.age + '</span>' +
                            '<span>' + _user.birth + '</span>' +
                            '<span>' + delivery + '</span>' +
                            '<span>' + gender + '</span>' +
                            '<span>' + country + '</span>' +
                            '<span>' +
                                '<button class="btn show-message-js" data-id="' + _user.id + '">Показать сообщение</button>' +
                             '</span>' +
                            '<span>' +
                                '<button class="btn delete-user-js" data-id="' + _user.id + '">Удалить</button>' +
                                '<button class="btn edit-user-js" data-id="' + _user.id + '">Редактировать</button>' +
                            '</span>' +
                        '</div>' +
                        '<div class="msg-box msg-box-js"><div class="in">' + _user.message + '</div></div>';


        if (withWrapper == true) {
            return '<li>' + dataStr + '</li>';
        } else {
            return dataStr
        }
    }


    app.dom.showPopupBtn.click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        var editMode = false;
        openPopup(editMode);

    });

        function openPopup (editMode) {
            if (editMode == true) {
                app.dom.saveEditBtn.show();
                app.dom.cancelPopupBtn.show();
                app.dom.sendPopupBtn.hide();
            } else {
                app.dom.saveEditBtn.hide();
                app.dom.cancelPopupBtn.hide();
                app.dom.sendPopupBtn.show();
            }
            app.dom.overlay.fadeIn(600);

            setPopupHeight(app.dom);

            app.dom.popup.fadeIn(600);
        }





    app.dom.overlay.on("click", function(e){
        var popupClick =  $(e.target).closest('#popup-box');

        if(popupClick.length > 0) {
            e.stopPropagation();
        } else {
            closePopup();
        }

    });



    app.dom.closePopupBtn.on('click',function() {
        closePopup();
    });

//add user

    app.dom.sendPopupBtn.on('click', function() {
        var user = getInfoUser(app.dom.popup, null);
        app.users.push(user);
        var needWrapperLi = true;
        var result = renderUser(user, needWrapperLi);
        app.dom.list.append(result);
        localStorage.clear();
        localStorage.setItem('users', JSON.stringify(app.users));
        closePopup();
    });


//Clean all popup fields



    function cleanPopupAllFields () {
        var nameInput =  app.dom.popup.find('.user-name-action'),
            surnameInput =  app.dom.popup.find('.user-surname-action'),
            ageInput =  app.dom.popup.find('.user-age-action'),
            birthInput = app.dom.popup.find('.user-birth-action'),
            messageInput =  app.dom.popup.find('.user-message-action'),
            countryInput = app.dom.popup.find('.select-action-js'),
            deliveryInput = app.dom.popup.find('.delivery-action'),
            genderInput = app.dom.popup.find('.gender-action');

        nameInput.val('');
        surnameInput.val('');
        ageInput.val('');
        birthInput.val('');
        messageInput.val('');
        deliveryInput.prop("checked", false);
        $(genderInput[0]).prop("checked", true);
        $(countryInput).select2("val", "");
    }


//Delete user


    app.dom.list.on('click', '.delete-user-js', function() {
        var pressedBtn = $(this);
        var userId = pressedBtn.data("id");
        var wrapper = pressedBtn.closest('li');
        wrapper.remove();
        for (var i = 0; i < app.users.length; ++i) {
            var idValue = app.users[i]['id'];
            if (idValue == userId ) {
                app.users.splice(i, 1);

            }
        }
        localStorage.clear();
        localStorage.setItem('users', JSON.stringify(app.users));

    });



//Edit user

    app.dom.list.on('click', '.edit-user-js', function() {
        var pressedBtn = $(this);
        var userId = pressedBtn.data("id");
        openPopup(true);

        var editingUser = null;

        var usersLS = localStorage.getItem('users');
         if (usersLS) {
             app.users = JSON.parse(usersLS);
         }

        for (var i = 0; i < app.users.length; ++i) {
            var idValue = app.users[i].id;

            if (idValue == userId ) {
                editingUser = app.users[i];
            }
        }

        var nameInput =  app.dom.popup.find('.user-name-action'),
            surnameInput =  app.dom.popup.find('.user-surname-action'),
            ageInput =  app.dom.popup.find('.user-age-action'),
            birthInput = app.dom.popup.find('.user-birth-action'),
            messageInput =  app.dom.popup.find('.user-message-action'),
            countryInput = app.dom.popup.find('.select-action-js'),
            deliveryInput = app.dom.popup.find('.delivery-action'),
            genderInput = app.dom.popup.find('.gender-action');

        nameInput.val(editingUser.name);
        surnameInput.val(editingUser.surname);
        ageInput.val(editingUser.age);
        birthInput.val(editingUser.birth);
        messageInput.val(editingUser.message);

       if (editingUser.delivery == true) {
            deliveryInput.prop("checked", true);
        } else {
            deliveryInput.prop("checked", false);
        }

        if (editingUser.male == true) {
            $(genderInput[0]).prop("checked", true);
        } else
            $(genderInput[1]).prop("checked", true);

        countryInput.val(editingUser.country).trigger("change");


        bindEditBtn(userId);
    });


//SAVE EDIT USER


    function bindEditBtn(userId) {

        app.dom.saveEditBtn.off().on('click', function() {

        var user = getInfoUser(app.dom.popup, userId);
            for (var i = 0; i < app.users.length; ++i) {
                var id = app.users[i].id;

                if (id == userId ) {
                    app.users[i] = user;
                    break;
                }
            }
            var editUserCheckbox = $('#' + userId);
            var wrapper = editUserCheckbox.closest('li');
            var currentUserMarkup = renderUser(user, false);
            wrapper.html(currentUserMarkup);
            closePopup();
            localStorage.clear();
            localStorage.setItem('users', JSON.stringify(app.users));
        });


    }


//DELETE ALL USERS

    app.dom.deleteAllBtn.on('click', function() {
        var everyCheckbox = $('.checkbox-action-js:checked');
        if (everyCheckbox.length !== 0) {
                for (var i = 0; i < everyCheckbox.length; ++i ) {

                    var idUser = $(everyCheckbox[i]).prop('id');
                    var currentCheckbox = everyCheckbox[i].closest('li');
                    currentCheckbox.remove();
                    var idValue = app.users[i].id;
                    if (idUser == idValue) {
                        app.users.splice(i, 1);
                        everyCheckbox.splice(i, 1);
                        --i;

                    }

                }
            localStorage.clear();
            localStorage.setItem('users', JSON.stringify(app.users));

            app.dom.deleteAllBtn.attr('disabled', 'disabled');
            app.dom.checkboxAll.removeAttr('checked');
        }

    });



//Checkbox checkAll

    app.dom.list.on('click', '#ckb-all', function(e) {
        app.dom.deleteAllBtn.removeAttr('disabled');
        var arrayCheckbox = $('.checkbox-action-js');
        if  ( app.dom.checkboxAll.prop( "checked" )== true) {
                arrayCheckbox.prop('checked', true);
        } else {
            arrayCheckbox.prop('checked', false);
            app.dom.deleteAllBtn.attr('disabled', 'disabled');
        }


    });

//checkboxes

   app.dom.list.on('click', '.checkbox-action-js', function(e) {
       var everyCheckbox = $('.checkbox-action-js:checked');
       var arrayCheckbox = $('.checkbox-action-js');
       app.dom.deleteAllBtn.removeAttr('disabled');

    if (everyCheckbox.length == arrayCheckbox.length) {
        app.dom.checkboxAll.prop('checked', true);

    } else if ( everyCheckbox.length !== arrayCheckbox.length) {
        app.dom.checkboxAll.prop('checked', false);
    }
       if (everyCheckbox.length == 0) {
        app.dom.deleteAllBtn.attr('disabled', 'disabled');
    }
});


//showMessage

    app.dom.list.on('click','.show-message-js', function(e) {
        var pressedBtn = $(this);
        var msgBox = pressedBtn.closest('li').find('.msg-box-js');
     //  msgBox.slideDown();
        if (msgBox.is(":visible")) {
            msgBox.slideUp();
        } else {
            var allMsgBoxes = $('.msg-box-js');
            allMsgBoxes.slideUp();
            msgBox.slideDown();
        }

    });


// Select

    app.dom.countrySelect.select2();

// Datepiker

    $('#datepicker').datepicker({
         dateFormat:'dd-mm-yy',
         changeYear: true
    });
});