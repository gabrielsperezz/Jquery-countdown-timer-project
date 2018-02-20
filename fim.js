$(document).ready(function () {
    $("#voltar").click(function () {
       window.location = "Timer.html";
    });

    function pisca() {
        var $pisca = $('#fim');
        $pisca.addClass('mostrar');
        setTimeout(function () {
            $pisca.removeClass('mostrar');
            $pisca.addClass('mostrar1');
            setTimeout(function () {
                $pisca.removeClass('mostrar1');
            }, 500);
        }, 500);

    }

    setInterval(pisca, 1500);

});
