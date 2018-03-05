$.get(chrome.extension.getURL('js/injected.js'),
    function(data) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = data;
        // document.querySelector('head').appendChild(script);
        // document.querySelector("body").addEventListener('load', 'me_injected.init()', false);
        document.getElementsByTagName("head")[0].appendChild(script);
        document.getElementsByTagName("body")[0].setAttribute("onLoad", "meInjected.init();");
    }
);


