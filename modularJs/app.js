requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        jquery: 'https://code.jquery.com/jquery-2.2.2.min'
    }
});

requirejs(['app/main']);