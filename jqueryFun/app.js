requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../js_min',
        jquery: 'https://code.jquery.com/jquery-2.2.2.min'
    }
});

requirejs(['jquery', 'app/main']);