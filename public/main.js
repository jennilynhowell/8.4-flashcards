(function($){
  'use strict';

  let $signupForm = $('.signupForm');
  let $errorDiv = $('#errorDiv');

  $signupForm.on('submit', (e) => {
    e.preventDefault();
    let fields = $('.signupForm :input');
    let body = {
      username: '',
      password: '',
      passwordConf: ''
    };
    for (let i = 0; i < (fields.length - 1); i++) {
      if (fields[i].name === 'username') {
        body.username = fields[i].value;
      } else if (fields[i].name === 'password') {
        body.password = fields[i].value;
      } else if (fields[i].name === 'passwordConf') {
        body.passwordConf = fields[i].value;
      } else {
        //nothing happens w other fields
      }
    };

    let request = new Request ('/api/user',
      {
        method: 'POST',
        body: JSON.stringify(body),
        bodyUsed: true,
        headers: {
          'Content-Type': 'application/json'
        }
      },
    );

    fetch(request).then(res => {
      res.json().then(data => {
        if (data.message === 'Error') {
          let errorMsg = document.createElement('p');
          errorMsg.textContent = 'Sorry, something went wrong';
          $errorDiv.appendChild(errorMsg);
        }
      });
    });

  });


}(jQuery));
