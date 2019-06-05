var MobileProfilePage = function () {
  this.init();
};

MobileProfilePage.prototype = {
  config: {
      classes: {
          profileClass: '.js-profile',
          submenuClass: '.js-submenu-block',
          userIdClass: '.js-profile-data',
          sympathyClass: '.js-sympathy-btn'
      },
      correctAjaxTexts: {
          removeSympathy: 'Симпатия удалена',
          setSympathy: 'Симпатия добавлена'
      }
  },

  init: function () {
      var self = this;

      /* сворачивает/разворачивает блоки о себе-партнере */
      self.showMore = new ShowMore($(self.config.classes.profileClass));


      self.disablingBtn = false;

      /* наследие прошлого*/
      var userId = $(self.config.classes.userIdClass).data('user-id');

      $(self.config.classes.sympathyClass).off(MobileLove.docEvent).on(MobileLove.docEvent, function () {
          var btn = $(this);

          if (self.disablingBtn) {
              return;
          }

          self.disablingBtn = true;

          if (btn.hasClass('js-del-sympathy')) {
              LoveRun.LoveSimpleRPC.removeSympathy(userId, function (response, err) {

                  if (response === false) {
                      alert(err.message);
                      self.disablingBtn = false;
                      return;
                  }

                  btn.removeClass('js-del-sympathy _active').addClass('js-set-sympathy');
                  self.disablingBtn = false;
              });
          } else {
              LoveRun.LoveSimpleRPC.setSympathy(userId, function (response, err) {

                  if (response === false) {
                      alert(err.message);
                      self.disablingBtn = false;
                      return;
                  }

                  btn.removeClass('js-set-sympathy').addClass('js-del-sympathy _active');
                  self.disablingBtn = false;

              });
          }

      });
      /* /наследие прошлого*/
  }
};

$.fn.ready(function () {
  MobileLove.MobileProfilePage = new MobileProfilePage();
});
