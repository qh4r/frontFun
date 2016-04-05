requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../js_min',
        domReady: 'domReady',
        modernizr: 'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min',
        jquery: 'https://code.jquery.com/jquery-2.2.3.min'
    }
});

requirejs(['app/main']);