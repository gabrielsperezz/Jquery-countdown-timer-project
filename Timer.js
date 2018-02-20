$(document).ready(function () {
    var t;
    var clock;
    var hoursSpan;
    var minutesSpan;
    var secondsSpan;
    var inicializado = false;
    var editando = false;

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime, executeinterval) {
        clock = document.getElementById(id);
        minutesSpan = clock.querySelector('.minutes');
        secondsSpan = clock.querySelector('.seconds');

        function updateClock(executeinterval) {
            t = getTimeRemaining(endtime);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
            if ((t.minutes == 0) && (t.seconds == 0)) {
                window.location = 'fim.html';
            }
            if (t.total <= 0 && executeinterval) {
                clearInterval(timeinterval);
            }
        }

        updateClock(executeinterval);
        if (executeinterval) {
            var timeinterval = setInterval(updateClock, 1000);
        }
    }


    var m = parseInt("1");


    function aumentamin() {
        t.minutes++;
        minutesSpan.innerHTML = (t.minutes < 10) ? '0' + t.minutes : t.minutes;
        m = minutesSpan.innerHTML
    }

    function diminuemin() {
        t.minutes--;
        minutesSpan.innerHTML = (t.minutes < 10) ? '0' + t.minutes : t.minutes;
        m = minutesSpan.innerHTML
    }

    function inicializatimmer() {
        if (!inicializado && !editando) {
            var deadline = new Date(Date.parse(new Date()) + m * 60 * 1000);
            initializeClock('clockdiv', deadline, true);
            inicializado = true;
        }
    }

    function reload() {
        location.reload();
    }

    $(document).on('keyup', function (e) {
        switch (e.which) {
            case 40:
                diminuemin();
                break;
            case 38:
                aumentamin();
                break;
            case 32:
                inicializatimmer();
                break;
            case 46:
                reload();
                break;
            case 13:
                if (editando) {
                    var title = document.getElementsByTagName('h1')[0];
                    var span = title.firstChild;
                    var field = span.firstChild;
                    field.blur();
                }
                break;
        }
    });

    function editTitle() {
        var title = document.getElementsByTagName('h1')[0];
        var span = title.firstChild;

        span.onclick = function (e) {
            editando = true;
            var textoAtual = this.firstChild.nodeValue;
            var input = '<input type="text" name="text"  value="' + textoAtual + '">';
            this.innerHTML = input;
            var field = this.firstChild;
            this.onclick = null;
            this.onmouseover = null;
            field.focus();
            field.select();

            field.onblur = function () {
                this.parentNode.innerHTML = this.value;
                editTitle();
                editando = false;
            }
            e.stopPropagation();
        }
    }

    editTitle();


    var deadline = new Date(Date.parse(new Date()) + m * 60 * 1000);
    initializeClock('clockdiv', deadline, false);
});
