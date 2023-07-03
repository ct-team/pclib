define(function () {
    function init() {
        $('#test').click(function () {
            console.log('is a init.');
        });
    }
    return {
        init
    };
});
