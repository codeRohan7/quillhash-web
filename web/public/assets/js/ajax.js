var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

$(document).ready(function(){
  const data = {};
  $('#contactus').on('click', function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var autocomplete = $("#autocomplete").val();
    var message = $("#message").val();
    var email = $("#email").val();

    if (!name || !autocomplete || !message || !email) {
      alert('Please Enter All Required Data');
    } else {


      data.name = name;
    data.service = autocomplete;
    data.message = message;
    data.email = email;
    console.log('data : ', data);
    // $.post('http://localhost:7010/api/v1/user/contactUs',
   $.ajax({  
                     url: 'https://www.quillhash.com/api/v1/contactus',  
                     type: 'POST',  
                       
                     data: data,  
                     success: function (data, textStatus, xhr) {  
                         console.log(data); 
                         if (!!data.success) {
                           alert(data.message);
                         }
                         else {
                           alert ('Please try again')
                         }
                     },  
                     error: function (xhr, textStatus, errorThrown) {  
                         console.log('Error in Operation', );  
                     }  
                 });
      
    }

    name = $("#name").val('');
    autocomplete = $("#autocomplete").val('');
    message = $("#message").val('');
    email = $("#email").val('');

    });
  });


$(document).ready(function(){
  const data = {};
  $('#lab-contact').on('click', function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var activity = $("#activity").val();
    var email = $("#email").val();


    if (!name || !activity || !email) {
      alert('Please Enter All Required Data');
    } else {
      data.name = name;
      data.service = activity;
      data.email = email;
      data.message = 'Interested in Quillhash labs meetups and events'
      console.log('data : ', data);
      // $.post('http://localhost:7010/api/v1/user/contactUs',
     $.ajax({  
                       url: 'https://www.quillhash.com/api/v1/contactus',  
                       type: 'POST',  
                       dataType: 'json',  
                       data: data,  
                       success: function (data, textStatus, xhr) {  
                        console.log(data); 
                        console.log(data.success)
                        if (!!data.success) {
                          alert(data.message);
                        }
                        else {
                          alert ('Please try again')
                        }
                       },  
                       error: function (xhr, textStatus, errorThrown) {  
                           console.log('Error in Operation', );  
                       }  
                   });  
    }

    name = $("#name").val('');
    activity = $("#activity").val('');
    email = $("#email").val('');
      
    });
  });

$(document).ready(function(){
  const data = {};
  $('#career-contact').on('click', function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var role = $("#role").val();
    var email = $("#email").val();
    var linkedin = $("#linkedin").val();
    var shareurl = $("#shareurl").val();

    if (!name || !role || !email || !linkedin || !shareurl) {
      alert('Please Enter All Required Data');
    }
    else { 
       
      data.name = name;
      data.role = role;
      data.email = email;
      data.linkedin = linkedin;
      data.shareurl = shareurl;
      //console.log('data : ', data);
    // $.post('http://localhost:7010/api/v1/user/contactUs',
   $.ajax({  
                     url: 'https://www.quillhash.com/api/v1/apply',  
                     //url: 'http://127.0.0.1:4002/api/v1/apply', 
                     type: 'POST',  
                     dataType: 'json',  
                     data: data,  
                     success: function (data, textStatus, xhr) {  
                         console.log(data);  
                         if (!!data.success) {
                          alert(data.message);
                        }
                        else {
                          alert ('Please try again')
                        }
                     },  
                     error: function (xhr, textStatus, errorThrown) {  
                         console.log('Error in Operation', );  
                     }  
                 });  

    }

    name = $("#name").val('');
    mobile = $("#mobile").val('');
    role = $("#role").val('');
    experience = $("#experience").val('');
    shareurl = $("#shareurl").val('');
    
      
    });
  });

$(document).ready(function(){
  const data = {};
  $('#contactform').on('submit', function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var message = $("#message").val();
    data.name = name;
    data.email = email;
    data.mobile = mobile;
    data.message = message;
    console.log('data : ', data);
    // $.post('http://localhost:7010/api/v1/user/contactUs',
   $.ajax({  
                     url: 'https://www.quillhash.com/contactus2',  
                     type: 'POST',  
                     dataType: 'json',  
                     data: data,  
                     success: function (data, textStatus, xhr) {  
                         console.log(data);  
                     },  
                     error: function (xhr, textStatus, errorThrown) {  
                         console.log('Error in Operation', );  
                     }  
                 });  
      // if(message === "We will contact you as soon as possible") {
      //   $('.alert-success').fadeIn();
      //   var hide = function(){
      //     $('.alert-success').fadeOut();
      //   };
      //   setTimeout(hide, 2000);
      // }
      if(message === "We will contact you as soon as possible") {
        alert(message);
      }
      // $('.alert-success').show();
      // alert(message);
      $( '#contactform' ).each(function(){
        this.reset();
      });
    });
  });


$(document).ready(function(){
  const data = {};
  $('#subscribe_newsletter').on('click', function(event) {
    event.preventDefault();
    var email = $("#news_signup_email").val();
    console.log(email);
    if (!email) {
      alert('Please Enter All Required Data');
    } else {

    data.email = email;
    console.log('data : ', data);
    // $.post('http://localhost:7010/api/v1/user/contactUs',
   $.ajax({  
                     url: 'https://www.quillhash.com/subscribe',  
                     type: 'POST',  
                       
                     data: data,  
                     success: function (data, textStatus, xhr) {  
                         console.log(data); 
                         if (!!data.success) {
                           alert(data.message);
                                 data:" ";

                         }
                         else {
                           alert ('Please try again')
                         }
                     },  
                     error: function (xhr, textStatus, errorThrown) {  
                         console.log('Error in Operation', );  
                     }  
                 });

    }
      email = $("#news_signup_email").val('');
    
    });
  });




/*$(document).ready(function(){
  console.log("STEPS BLOCKCHAIN : MULTIPLE FORM");
  const data = {};
  $('#msform').on('submit', function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var blockchainSector;
    if(!!$("#finance").val()) {
      blockchainSector = "Finance"
    }
    if(!!$("#insurance").val()) {
      blockchainSector = "Insurance"
    }
    if(!!$("#supplychain").val()) {
      blockchainSector = "Supply Chain"
    }
    if(!!$("#medical").val()) {
      blockchainSector = "Medical"
    }
    if(!!$("#identify").val()) {
      blockchainSector = "Identify"
    }
    if(!!$("#asset").val()) {
      blockchainSector = "Asset Management"
    }
    if(!!$("#payment").val()) {
      blockchainSector = "Payment"
    }

    var blockchainProtocol;
    if(!!$("#permissioned").val()) {
      blockchainSector = "Permissioned"
    }
    if(!!$("#permissionless").val()) {
      blockchainSector = "Permissionless"
    }
    if(!!$("#federated").val()) {
      blockchainSector = "Federated"
    }
    
    var blockchainTechnology;
    if(!!$("#ethereum").val()) {
      blockchainSector = "Ethereum"
    }
    if(!!$("#eos").val()) {
      blockchainSector = "EOS"
    }
    if(!!$("#tron").val()) {
      blockchainSector = "Tron"
    }
    if(!!$("#hyperledger").val()) {
      blockchainSector = "Hyperledger"
    }
    if(!!$("#stellar").val()) {
      blockchainSector = "Stellar"
    }
    if(!!$("#quorum").val()) {
      blockchainSector = "Quorum"
    }
    
    var message = $("#message").val();

    data.name = name;
    data.email = email;
    data.blockchainSector = blockchainSector;
    data.blockchainProtocol = blockchainProtocol;
    data.blockchainTechnology = blockchainTechnology;
    data.message = message;
    console.log('data : ', data);
   $.ajax({  
                     url: '/',  
                     type: 'POST',  
                     dataType: 'json',  
                     data: data,  
                     success: function (data, textStatus, xhr) {  
                         console.log(data);  
                     },  
                     error: function (xhr, textStatus, errorThrown) {  
                         console.log('Error in Operation', );  
                     }  
                 });  
  
      if(message === "We will contact you as soon as possible") {
        alert(message);
      }
      // $('.alert-success').show();
      // alert(message);
      $( '#msform' ).each(function(){
        this.reset();
      });
    });
  });
*/