requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../js_min',
        domReady: 'domReady',
        jquery: 'https://code.jquery.com/jquery-2.2.3.min'
    }
});

requirejs(['app/main']);