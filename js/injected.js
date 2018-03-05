var meInjected = new (function ($){

    var self = this; 

    this.def = {
        sites: {
           'http://test1.com': { requireJquery: false, func: 'test1JS' },
           'https://sub.test2.com': { requireJquery: true, func: 'test2' },
           
        }
    };

    this.loadScript = function(url, callback)
    {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    }

    this.init = function(){
        console.log('Injected extension loaded');
        for(var site in self.def.sites){
            if (location.href.indexOf(site) == 0){
                if (self.def.sites[site]['requireJquery']){
                    if (!$){
                        self.loadScript('//code.jquery.com/jquery-1.11.3.min.js',function(){
                            $ = jQuery;
                            $.noConflict();
                            console.log('jquery connected');
                            //console.log(jQuery);
                            meInjected.init();
                        });
                        return false;
                    }
                }

                self[self.def.sites[site]['func']]();
            };
        }
    };

    /**
    * Convert an image
    * to a base64 url
    * @param  {String}   url
    * @param  {Function} callback
    * @param  {String}   [outputFormat=image/png]
    */
    this.convertImgToBase64URL = function(url, callback, outputFormat){
       var img = new Image();
       img.crossOrigin = 'Anonymous';
       img.onload = function(){
           var nwidth = 50;
           var canvas = document.createElement('CANVAS'),
           ctx = canvas.getContext('2d'), dataURL;
           // canvas.height = nwidth * img.height / img.width;
           // canvas.width = nwidth;
           canvas.height = img.height;
           canvas.width = img.width;
           ctx.drawImage(img, 0, 0);
           dataURL = canvas.toDataURL(outputFormat);
           callback(dataURL);
           canvas = null;
       };
       img.src = url;
    };

    this.readCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        console.log(ca);
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    this.inArray = function(needle, haystack){
        var found = false, key;
        for (key in haystack) {
            if (haystack[key] === needle){ found = true; break; }
        } return found;
    };


    // sites injected
    this.test1JS = function(){
        console.log('test1.com extension started');
        if (location.href.indexOf('bla-bla-bla') !== -1) {

        }
    };


    this.test2 = function(){
        console.log('test2.com extension started');
        $('table table td > a').each(function(){

        });


    };

    return this;
})(window.jQuery);




