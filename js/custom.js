$(function () {
    $("#barba-wrapper").on("click", ".button", function () {
        $(".button").removeClass("active")
        $(this).addClass("active");
        var filter = $(this).data("filter");

        $(".filter").each(function () {
            var topic = $(this).data("topic");

            if (topic == filter) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });

    });

    //Smooth scroll to top
    $("#barba-wrapper").on("click", "#top", function () {
        $("#content").animate({
            scrollTop: 0
        }, 1000);
    });



    var ww = $(window).innerWidth();

    //    $(document).on("click", ".nav-link", function () {
    //
    //        if (ww <= 768) {
    //            $("#sidebar").fadeOut();
    //            $(this).html("&#8801;");
    //            $(this).removeClass("active");
    //        }
    //    });
    //
    //    $(document).on("click", "#menu", function () {
    //        if ($(this).hasClass("active")) {
    //            $("#sidebar").fadeOut();
    //            $(this).html("&#8801;");
    //            $(this).removeClass("active");
    //        } else {
    //            $("#sidebar").fadeIn();
    //            $(this).addClass("active");
    //            $(this).html("&times;");
    //
    //        }
    //    });


    //wavy text
    var text = "Enjoy Your Stay";


    for (var i in text) {
        if (text[i] === "") {
            $(".one").append($("<span>").html("&nbsp;"));
        } else {
            $(".one").append($("<span>").text(text[i]));
        }
    }
    
//    var text = "Coming Soon";
//    for (var i in text) {
//        if (text[i] === "") {
//            $(".two").append($("<span>").html("&nbsp;"));
//        } else {
//            $(".two").append($("<span>").text(text[i]));
//        }
//    }
//



    Barba.Pjax.start();



    var FadeTransition = Barba.BaseTransition.extend({
        start: function () {
            /**
             * This function is automatically called as soon the Transition starts
             * this.newContainerLoading is a Promise for the loading of the new container
             * (Barba.js also comes with an handy Promise polyfill!)
             */

            //            $("html").css("overflow-y", "hidden");
            //            $("body").css("overflow", "hidden");

            // As soon the loading is finished and the old page is faded out, let's fade the new page
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        fadeOut: function () {
            /**
             * this.oldContainer is the HTMLElement of the old Container
             */

            return $(this.oldContainer).animate({
                opacity: 0
            }).promise();
        },

        fadeIn: function () {
            /**
             * this.newContainer is the HTMLElement of the new Container
             * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
             * Please note, newContainer is available just after newContainerLoading is resolved!
             */
            $(window).scrollTop(0);
            $("#content").scrollTop(0);
            var _this = this;
            var $el = $(this.newContainer);

            $(this.oldContainer).hide();

            $el.css({
                visibility: 'visible',
                opacity: 0
            });

            $el.animate({
                opacity: 1
            }, 1000, function () {
                /**
                 * Do not forget to call .done() as soon your transition is finished!
                 * .done() will automatically remove from the DOM the old Container
                 */

                _this.done();

            });
        }
    });

    /**
     * Next step, you have to tell Barba to use the new Transition
     */

    Barba.Pjax.getTransition = function () {
        /**
         * Here you can use your own logic!
         * For example you can use different Transition based on the current page or link...
         */

        return FadeTransition;
    };

    Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {

    });

});