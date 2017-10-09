$(function () {

    /*
      Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
    */
    $.fn.scrollEnd = function (callback, timeout) {
        $(this).scroll(function () {
            var $this = $(this);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback, timeout));
        });
    };

    /*
      Función que inicializa el elemento Slider
    */

    function inicializarSlider() {
        $("#rangoPrecio").ionRangeSlider({
            type: "double",
            grid: false,
            min: 0,
            max: 100000,
            from: 200,
            to: 80000,
            prefix: "$"
        });
    }

    $(function () {
        $('select').material_select();
        inicializarSlider();
        ciudad_carga();
        tipo_carga();
    });

    var ciudad = $("#selectCiudad");
    var tipo = $("#selectTipo");
    var resultado = $("#resultado");

    function ciudad_carga() {

        $.ajax({
            url: 'consulta.php',
            type: 'POST',
            data: 'tipo=ciudad',
            success: function (data) {
                ciudad.find('option').remove();
                ciudad.append('<option value="" selected>Selecciona una ciudad</option>');
                $.each(data, function (id, value) {
                    ciudad.append('<option value="' + value + '">' + value + '</option>');

                });
                $('select').material_select();
            },
            error: function (data, textStatus, errorThrown) {
                console.log('message=:' + data + ', text status=:' + textStatus + ', error thrown:=' + errorThrown);
            }
        });
    }

    function tipo_carga() {

        $.ajax({
            url: 'consulta.php',
            type: 'POST',
            data: 'tipo=tipo',
            success: function (data) {
                tipo.find('option').remove();
                tipo.append('<option value="" selected>Selecciona un tipo</option>');
                $.each(data, function (id, value) {
                    tipo.append('<option value="' + value + '">' + value + '</option>');
                });
                $('select').material_select();
            },
            error: function (data, textStatus, errorThrown) {
                console.log('message=:' + data + ', text status=:' + textStatus + ', error thrown:=' + errorThrown);
            }
        });
    }

    $("#mostrarTodos").click(function () {
        resultado.find('div').remove();

        $.ajax({
            url: 'consulta.php',
            type: 'POST',
            data: 'tipo=todos',
            success: function (data) {
                $.each(data, function (id, value) {
                    var datos =
                        "<div class='card horizontal'>" +
                        "<div class='card-image'>" +
                        "<div class='itemMostrado'><img src='img/home.jpg'/></div>" +
                        "</div>" +
                        "<div class='card-stacked'>" +
                        "<div class='card-content'>" +
                        "<p><strong>Direccion: </strong>" + value['Direccion'] + "</p>" +
                        "<p><strong>Ciudad: </strong>" + value['Ciudad'] + "</p>" +
                        "<p><strong>Telefono: </strong>" + value['Telefono'] + "</p>" +
                        "<p><strong>Código postal: </strong>" + value['Codigo_Postal'] + "</p>" +
                        "<p><strong>Tipo: </strong>" + value['Tipo'] + "</p>" +
                        "<div class='precioTexto'><strong>Precio: </strong>" + value['Precio'] + "</div>" +
                        "</div>" +
                        "<div class='card-action' >" +
                        "<a href='#'>Ver mas</a> " +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    resultado.append(datos);
                });
            },
            error: function (data, textStatus, errorThrown) {
                console.log('message=:' + data + ', text status=:' + textStatus + ', error thrown:=' + errorThrown);
            }
        });
    });

    var request;

    $("#formulario").submit(function (event) {

        event.preventDefault();
        if (request) {
            request.abort();
        }
        var $form = $(this);
        var $inputs = $form.find("input, select, button, textarea");
        var serializedData = $form.serialize();
        var postForm = { //Fetch form data
            'sCiudad': $('select[name=ciudad]').val(),
            'sTipo': $('select[name=tipo]').val(),
            'sDesde': $('#rangoPrecio').data().from,
            'sHasta': $('#rangoPrecio').data().to,
            'tipo': 'filtro'
        };
        $inputs.prop("disabled", true);
        resultado.find('div').remove();
        $.ajax({
            url: 'buscador.php',
            type: 'POST',
            data: postForm,
            success: function (data) {
                $.each(data, function (id, value) {
                    var datos =
                        "<div class='card horizontal'>" +
                        "<div class='card-image'>" +
                        "<div class='itemMostrado'><img src='img/home.jpg'/></div>" +
                        "</div>" +
                        "<div class='card-stacked'>" +
                        "<div class='card-content'>" +
                        "<div><strong>Direccion: </strong>" + value['Direccion'] + "</div>" +
                        "<div><strong>Ciudad: </strong>" + value['Ciudad'] + "</div>" +
                        "<div><strong>Telefono: </strong>" + value['Telefono'] + "</div>" +
                        "<div><strong>Código postal: </strong>" + value['Codigo_Postal'] + "</div>" +
                        "<div><strong>Tipo: </strong>" + value['Tipo'] + "</div>" +
                        "<div class='precioTexto'><strong>Precio: </strong>" + value['Precio'] + "</div>" +
                        "</div>" +
                        "<div class='card-action'>" +
                        "<a href='#'>Ver mas</a> " +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    resultado.append(datos);
                });
                $inputs.prop("disabled", false);
            },
            error: function (data, textStatus, errorThrown) {
                console.log('message=:' + data + ', text status=:' + textStatus + ', error thrown:=' + errorThrown);
                $inputs.prop("disabled", false);
            }
        });
        $inputs.prop("disabled", false);

    });
});