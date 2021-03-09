$(document).ready(function() {
  $("#toggle").click(function() {
    var elem = $("#toggle").text();
    if (elem == "Show More") {
      //Stuff to do when btn is in the read more state
      $("#toggle").text("Show Less");
      $("#text").slideDown();
    } else {
      //Stuff to do when btn is in the read less state
      $("#toggle").text("Show More");
      $("#text").slideUp();
    }
  });
});

window.bioEp = {
  bgEl: {},
  popupEl: {},
  closeBtnEl: {},
  shown: false,
  overflowDefault: "visible",

  html: "",
  css: "",
  fonts: [],
  delay: 0,
  showOnDelay: false,
  cookieExp: 30,

  cookieManager: {
    // Create a cookie
    create: function(name, value, days) {
      var expires = "";

      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }

      document.cookie = name + "=" + value + expires + "; path=/";
    },

    get: function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }

      return null;
    },

    erase: function(name) {
      this.create(name, "", -1);
    }
  },

  checkCookie: function() {

    if (this.cookieExp <= 0) {
      this.cookieManager.erase("bioep_shown");
      return false;
    }

    if (this.cookieManager.get("bioep_shown") == "true")
      return true;

    this.cookieManager.create("bioep_shown", "true", this.cookieExp);

    return false;
  },

  addCSS: function() {
    for (var i = 0; i < this.fonts.length; i++) {
      var font = document.createElement("link");
      font.href = this.fonts[i];
      font.type = "text/css";
      font.rel = "stylesheet";
      font.rel = "stylesheet";
      document.head.appendChild(font);
    }

  },

  addPopup: function() {
    this.bgEl = document.createElement("div");
    this.bgEl.id = "news-signup_bg";
    document.body.appendChild(this.bgEl);

    if (document.getElementById("news-signup"))
      this.popupEl = document.getElementById("news-signup");
    else {
      this.popupEl = document.createElement("div");
      this.popupEl.id = "news-signup";
      this.popupEl.innerHTML = this.html;
      document.body.appendChild(this.popupEl);
    }
  },

  showPopup: function() {
    if (this.shown) return;

    this.bgEl.style.visibility = "visible";
    this.popupEl.style.visibility = "visible";
    this.popupEl.style.opacity = "1";
    this.popupEl.style.transform = "scale(1)";
    this.popupEl.style.webkitTransform = "scale(1)";
    this.popupEl.style.transition = "0.4s, opacity 0.4s";
    this.popupEl.style.webkitTransform = "0.4s, opacity 0.4s";
    
    this.overflowDefault = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    this.shown = true;
  },

  hidePopup: function() {
    this.bgEl.style.visibility = "hidden";
    this.popupEl.style.visibility = "hidden";
    this.popupEl.style.opacity = "0";
    this.popupEl.style.transform = "scale(0.5)";
    this.popupEl.style.webkitTransform = "scale(0.5)";
    this.popupEl.style.transition = "0.2s, opacity 0.2s, visibility 0s 0.2s";
    this.popupEl.style.webkitTransform = "0.2s, opacity 0.2s, visibility 0s 0.2s";
    document.body.style.overflow = this.overflowDefault;
  },

  addEvent: function(obj, event, callback) {
    if (obj.addEventListener)
      obj.addEventListener(event, callback, false);
    else if (obj.attachEvent)
      obj.attachEvent("on" + event, callback);
  },

  loadEvents: function() {

    this.addEvent(document, "mouseout", function(e) {
      e = e ? e : window.event;

      // If this is an autocomplete element.
      if(e.target.tagName.toLowerCase() == "input")
        return;

      // Get the current viewport width.
      var vpWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

      // If the current mouse X position is within 50px of the right edge
      // of the viewport, return.
      if(e.clientX >= (vpWidth - 50))
        return;

      // If the current mouse Y position is not within 50px of the top
      // edge of the viewport, return.
      if(e.clientY >= 50)
        return;

      // Reliable, works on mouse exiting window and
      // user switching active program
      var from = e.relatedTarget || e.toElement;
      if(!from)
        bioEp.showPopup();
    }.bind(this));

    this.closebtn = document.getElementById("news-signup_close");
    this.addEvent(this.closebtn, "click", function() {
      bioEp.hidePopup();
    });
  },

  setOptions: function(opts) {
    this.html = (typeof opts.html === 'undefined') ? this.html : opts.html;
    this.css = (typeof opts.css === 'undefined') ? this.css : opts.css;
    this.fonts = (typeof opts.fonts === 'undefined') ? this.fonts : opts.fonts;
    this.delay = (typeof opts.delay === 'undefined') ? this.delay : opts.delay;
    this.showOnDelay = (typeof opts.showOnDelay === 'undefined') ? this.showOnDelay : opts.showOnDelay;
    this.cookieExp = (typeof opts.cookieExp === 'undefined') ? this.cookieExp : opts.cookieExp;
  },

  domReady: function(callback) {
    (document.readyState === "interactive" || document.readyState === "complete") ? callback(): this.addEvent(document, "DOMContentLoaded", callback);
  },

  init: function(opts) {
    if (typeof opts !== 'undefined')
      this.setOptions(opts);

    this.addCSS();

    this.domReady(function() {
      if (bioEp.checkCookie()) return;

      bioEp.addPopup();

      setTimeout(function() {
        bioEp.loadEvents();

        if (bioEp.showOnDelay)
          bioEp.showPopup();
      }, bioEp.delay * 1000);
    });
  }
}

window.onload = function() {
  document.getElementById("email").focus();
};

bioEp.init({
              fonts: ['https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300'],
              cookieExp: 0
          });




(function(e){"function"===typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function g(a,b){var c=function(){},c={autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:g.formatResult,delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:c,onSearchComplete:c,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",lookupFilter:function(a,b,c){return-1!==
a.value.toLowerCase().indexOf(c)},paramName:"query",transformResult:function(a){return"string"===typeof a?e.parseJSON(a):a}};this.element=a;this.el=e(a);this.suggestions=[];this.badQueries=[];this.selectedIndex=-1;this.currentValue=this.element.value;this.intervalId=0;this.cachedResponse=[];this.onChange=this.onChangeInterval=null;this.isLocal=this.ignoreValueChange=!1;this.suggestionsContainer=null;this.options=e.extend({},c,b);this.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"};
this.initialize();this.setOptions(b)}var h={extend:function(a,b){return e.extend(a,b)},createNode:function(a){var b=document.createElement("div");b.innerHTML=a;return b.firstChild}};g.utils=h;e.Autocomplete=g;g.formatResult=function(a,b){var c="("+b.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","g"),"\\$1")+")";return a.value.replace(RegExp(c,"gi"),"<strong>$1</strong>")};g.prototype={killerFn:null,initialize:function(){var a=this,b="."+a.classes.suggestion,c=a.classes.selected,
d=a.options,f;a.element.setAttribute("autocomplete","off");a.killerFn=function(b){0===e(b.target).closest("."+a.options.containerClass).length&&(a.killSuggestions(),a.disableKillerFn())};if(!d.width||"auto"===d.width)d.width=a.el.outerWidth();a.suggestionsContainer=g.utils.createNode('<div class="'+d.containerClass+'" style="position: absolute; display: none;"></div>');f=e(a.suggestionsContainer);f.appendTo(d.appendTo).width(d.width);f.on("mouseover.autocomplete",b,function(){a.activate(e(this).data("index"))});
f.on("mouseout.autocomplete",function(){a.selectedIndex=-1;f.children("."+c).removeClass(c)});f.on("click.autocomplete",b,function(){a.select(e(this).data("index"),!1)});a.fixPosition();if(window.opera)a.el.on("keypress.autocomplete",function(b){a.onKeyPress(b)});else a.el.on("keydown.autocomplete",function(b){a.onKeyPress(b)});a.el.on("keyup.autocomplete",function(b){a.onKeyUp(b)});a.el.on("blur.autocomplete",function(){a.onBlur()});a.el.on("focus.autocomplete",function(){a.fixPosition()})},onBlur:function(){this.enableKillerFn()},
setOptions:function(a){var b=this.options;h.extend(b,a);if(this.isLocal=e.isArray(b.lookup))b.lookup=this.verifySuggestionsFormat(b.lookup);e(this.suggestionsContainer).css({"max-height":b.maxHeight+"px",width:b.width+"px","z-index":b.zIndex})},clearCache:function(){this.cachedResponse=[];this.badQueries=[]},clear:function(){this.clearCache();this.currentValue=null;this.suggestions=[]},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},fixPosition:function(){var a;"body"===this.options.appendTo&&
(a=this.el.offset(),e(this.suggestionsContainer).css({top:a.top+this.el.outerHeight()+"px",left:a.left+"px"}))},enableKillerFn:function(){e(document).on("click.autocomplete",this.killerFn)},disableKillerFn:function(){e(document).off("click.autocomplete",this.killerFn)},killSuggestions:function(){var a=this;a.stopKillSuggestions();a.intervalId=window.setInterval(function(){a.hide();a.stopKillSuggestions()},300)},stopKillSuggestions:function(){window.clearInterval(this.intervalId)},onKeyPress:function(a){if(!this.disabled&&
!this.visible&&40===a.keyCode&&this.currentValue)this.suggest();else if(!this.disabled&&this.visible){switch(a.keyCode){case 27:this.el.val(this.currentValue);this.hide();break;case 9:case 13:if(-1===this.selectedIndex){this.hide();return}this.select(this.selectedIndex,13===a.keyCode);if(9===a.keyCode&&!1===this.options.tabDisabled)return;break;case 38:this.moveUp();break;case 40:this.moveDown();break;default:return}a.stopImmediatePropagation();a.preventDefault()}},onKeyUp:function(a){var b=this;
if(!b.disabled){switch(a.keyCode){case 38:case 40:return}clearInterval(b.onChangeInterval);if(b.currentValue!==b.el.val())if(0<b.options.deferRequestBy)b.onChangeInterval=setInterval(function(){b.onValueChange()},b.options.deferRequestBy);else b.onValueChange()}},onValueChange:function(){var a;clearInterval(this.onChangeInterval);this.currentValue=this.element.value;a=this.getQuery(this.currentValue);this.selectedIndex=-1;this.ignoreValueChange?this.ignoreValueChange=!1:a.length<this.options.minChars?
this.hide():this.getSuggestions(a)},getQuery:function(a){var b=this.options.delimiter;if(!b)return e.trim(a);a=a.split(b);return e.trim(a[a.length-1])},getSuggestionsLocal:function(a){var b=a.toLowerCase(),c=this.options.lookupFilter;return{suggestions:e.grep(this.options.lookup,function(d){return c(d,a,b)})}},getSuggestions:function(a){var b,c=this,d=c.options,f=d.serviceUrl;(b=c.isLocal?c.getSuggestionsLocal(a):c.cachedResponse[a])&&e.isArray(b.suggestions)?(c.suggestions=b.suggestions,c.suggest()):
c.isBadQuery(a)||(d.params[d.paramName]=a,!1!==d.onSearchStart.call(c.element,d.params)&&(e.isFunction(d.serviceUrl)&&(f=d.serviceUrl.call(c.element,a)),e.ajax({url:f,data:d.ignoreParams?null:d.params,type:d.type,dataType:d.dataType}).done(function(b){c.processResponse(b,a);d.onSearchComplete.call(c.element,a)})))},isBadQuery:function(a){for(var b=this.badQueries,c=b.length;c--;)if(0===a.indexOf(b[c]))return!0;return!1},hide:function(){this.visible=!1;this.selectedIndex=-1;e(this.suggestionsContainer).hide()},
suggest:function(){if(0===this.suggestions.length)this.hide();else{var a=this.options.formatResult,b=this.getQuery(this.currentValue),c=this.classes.suggestion,d=this.classes.selected,f=e(this.suggestionsContainer),g="";e.each(this.suggestions,function(d,e){g+='<div class="'+c+'" data-index="'+d+'">'+a(e,b)+"</div>"});f.html(g).show();this.visible=!0;this.options.autoSelectFirst&&(this.selectedIndex=0,f.children().first().addClass(d))}},verifySuggestionsFormat:function(a){return a.length&&"string"===
typeof a[0]?e.map(a,function(a){return{value:a,data:null}}):a},processResponse:function(a,b){var c=this.options,d=c.transformResult(a,b);d.suggestions=this.verifySuggestionsFormat(d.suggestions);c.noCache||(this.cachedResponse[d[c.paramName]]=d,0===d.suggestions.length&&this.badQueries.push(d[c.paramName]));b===this.getQuery(this.currentValue)&&(this.suggestions=d.suggestions,this.suggest())},activate:function(a){var b=this.classes.selected,c=e(this.suggestionsContainer),d=c.children();c.children("."+
b).removeClass(b);this.selectedIndex=a;return-1!==this.selectedIndex&&d.length>this.selectedIndex?(a=d.get(this.selectedIndex),e(a).addClass(b),a):null},select:function(a,b){var c=this.suggestions[a];c&&(this.el.val(c),this.ignoreValueChange=b,this.hide(),this.onSelect(a))},moveUp:function(){-1!==this.selectedIndex&&(0===this.selectedIndex?(e(this.suggestionsContainer).children().first().removeClass(this.classes.selected),this.selectedIndex=-1,this.el.val(this.currentValue)):this.adjustScroll(this.selectedIndex-
1))},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(a){var b=this.activate(a),c,d;b&&(b=b.offsetTop,c=e(this.suggestionsContainer).scrollTop(),d=c+this.options.maxHeight-25,b<c?e(this.suggestionsContainer).scrollTop(b):b>d&&e(this.suggestionsContainer).scrollTop(b-this.options.maxHeight+25),this.el.val(this.getValue(this.suggestions[a].value)))},onSelect:function(a){var b=this.options.onSelect;a=this.suggestions[a];
this.el.val(this.getValue(a.value));e.isFunction(b)&&b.call(this.element,a)},getValue:function(a){var b=this.options.delimiter,c;if(!b)return a;c=this.currentValue;b=c.split(b);return 1===b.length?a:c.substr(0,c.length-b[b.length-1].length)+a},dispose:function(){this.el.off(".autocomplete").removeData("autocomplete");this.disableKillerFn();e(this.suggestionsContainer).remove()}};e.fn.autocomplete=function(a,b){return 0===arguments.length?this.first().data("autocomplete"):this.each(function(){var c=
e(this),d=c.data("autocomplete");if("string"===typeof a){if(d&&"function"===typeof d[a])d[a](b)}else d&&d.dispose&&d.dispose(),d=new g(this,a),c.data("autocomplete",d)})}});

$(function(){
  var currencies = [
    { value: 'dNFT', data: 'DNFT' },
    { value: 'QuillAudits', data: 'QA' },
    { value: 'Tokenic', data: 'TOK' },
    { value: 'QuillChakra', data: 'QC' },
    { value: '0x Protocol Development', data: 'PD' },
    { value: 'Blockchain Consultancy', data: 'BC' },
    { value: 'Blockchain Deployment', data: 'BD' },
    { value: 'EOS Development', data: 'EOSD' },
    { value: 'Ethereum Development', data: 'ED' },
    { value: 'Game Development', data: 'GD' },
    { value: 'Hyperledger Fabric Development', data: 'HFD' },
    { value: 'Hyperledger Sawtooth Development', data: 'HSD' },
    { value: 'Hyperledger Service', data: 'HS' },
    { value: 'NFT Development', data: 'NFTD' },
    { value: 'Quorum Development', data: 'QD' },
    { value: 'Stablecoin Development', data: 'SD' },
    { value: 'Stellar Development', data: 'SDE' },
  ];
  
  $('#autocomplete').autocomplete({
    lookup: currencies,
    onSelect: function (suggestion) {
      var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
      $('#outputcontent').html(thehtml);
    }
  });
  

});






$(document).ready(function($) {

  $('#contact').on('click', function(event) {
    event.preventDefault();

    $('#contactblurb').html('Questions, suggestions, and general comments are all welcome!');
    $('.contact').addClass('is-visible');

    
  });

  //close popup when clicking x or off popup
  $('.cd-popup').on('click', function(event) {
    if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
      event.preventDefault();
      $(this).removeClass('is-visible');
    }
  });

  //close popup when clicking the esc keyboard button
  $(document).keyup(function(event) {
    if (event.which == '27') {
      $('.cd-popup').removeClass('is-visible');
    }
  });
    return false;
  });

$('#file-upload').change(function() {
    var filepath = this.value;
    var m = filepath.match(/([^\/\\]+)$/);
    var filename = m[1];
    $('#filename').html(filename);

});


//https://glidejs.com/docs/setup/



$(document).ready(function($) {

  $('#contact-1').on('click', function(event) {
    event.preventDefault();

    $('#contactblurb').html('Questions, suggestions, and general comments are all welcome!');
    $('.contact').addClass('is-visible');

    
  });

  //close popup when clicking x or off popup
  $('.cd-popup').on('click', function(event) {
    if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
      event.preventDefault();
      $(this).removeClass('is-visible');
    }
  });

  //close popup when clicking the esc keyboard button
  $(document).keyup(function(event) {
    if (event.which == '27') {
      $('.cd-popup').removeClass('is-visible');
    }
  });
    return false;
  });




$("document").ready(function(){
  $(".tab-slider--body").hide();
  $(".tab-slider--body:first").show();
});

$(".tab-slider--nav li").click(function() {
  $(".tab-slider--body").hide();
  var activeTab = $(this).attr("rel");
  $("#"+activeTab).fadeIn();
  if($(this).attr("rel") == "tab2"){
    $('.tab-slider--tabs').addClass('slide');
  }else{
    $('.tab-slider--tabs').removeClass('slide');
  }
  $(".tab-slider--nav li").removeClass("active");
  $(this).addClass("active");
});


(function ($) {
  "use strict";

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  new WOW().init();

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (! $('#header').hasClass('header-scrolled')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.main-nav, .mobile-nav').length) {
          $('.main-nav .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  var nav_sections = $('section');
  var main_nav = $('.main-nav, .mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
  
    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
          bottom = top + $(this).outerHeight();
  
      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
      }
    });
  });
})(jQuery);


$(document).ready(function(){
  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();

      // Store hash
      var hash = this.hash;
 
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        window.location.hash = hash;
      });
    }
  });
});