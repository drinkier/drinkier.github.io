jQuery(document).ready(function($) {
    var options = {
        startDate: new Date(),
        endDate: new Date("October 31, 2016 00:00:00")
    };

    $('#container').page(options);
});

(function($) {

    $.fn.page = function(opt) {

        var obj = this,
            /***   Default options   ***/
            defaults = {
                startDate: new Date(),
                endDate: new Date(),
                titleDays: 'days',
                titleHours: 'hours',
                titleMinutes: 'minutes',
                titleSeconds: 'seconds',
                theme: 'custome'
            },
            options = $.extend(defaults, opt);

        obj.init = function() {

            // Activate count down
            $("#countdown").dsCountDown(options);

            // Activate tooltip for social media link
            $(".sm-links a").aToolTip({
                fixed: true,
                inSpeed: 400,
                xOffset: -107.5
            });

            $('#preloader').fadeOut('slow');

            // Activate background
            $('#background').hide();
            var bg = $('#background img');
            console.log(bg.size());
            if (bg.size() == 1) {
                var imageSrc = $('#background img').attr('src');
                $.vegas({
                    src: imageSrc,
                    fade: 2000
                });
            }
        }

        // Do preloader
        obj.preloading = function() {
            var preloader = $('<div id="preloader"><div class="loading"><div class="label">loading...</div></div></div>');
            obj.prepend(preloader);
            preloader.numberBg = $('#background img').size();
            if (preloader.numberBg) {
                $('#background img').each(function(index) {
                    $('.loading', preloader).append('<span class="indicator-' + index + '"></span>');
                    var bg = $(this);
                    bg.itemIndex = index;
                    var img = new Image();
                    img.onload = function() {
                        $('.indicator-' + bg.itemIndex).addClass('done');
                        if ($('.done', preloader).size() >= preloader.numberBg) {
                            setTimeout(function() {
                                obj.init();
                            }, 500);
                        }
                    };
                    img.src = $(this).attr('src');
                });
            } else {
                obj.init();
            }
        }
        obj.preloading();

    }

})(jQuery);
