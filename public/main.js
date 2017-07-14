(function($){
  'use strict';

  let $signupForm = $('.signupForm');

  $signupForm.on('submit', (e) => {
    e.preventDefault();
    let fields = $('.signupForm :input');
    let fieldArray = [];
    for (let i = 0; i < fields.length; i++) {
      fieldArray.push(fields[i].name.value);
    };
    fieldArray.pop();
    console.log(fieldArray);

    // if (e.body.password !== e.body.passwordConf) {
    //   let error = document.createElement(div);
    //   error.textContent = 'Sorry, an error occured';
    //   signupForm.appendChild(error);
    // }
    // let headers = {
    //   username: e.body.username,
    //   password: e.body.password,
    //   passwordConf: e.body.passwordConf
    // };
    // let init = {
    //   method: 'GET',
    //   headers: headers,
    // };
  });



}(jQuery));
