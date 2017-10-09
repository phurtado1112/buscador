<?php
if (isset($_POST['tipo'])) {
    switch ($_POST['tipo']) {
        case 'ciudad':
            ciudad_lista();
            break;
        case 'tipo':
            tipo_lista();
            break;
        case 'todos':
            header('Content-type: application/json; charset=utf-8');
            echo json_encode(lista('data-1.json'), JSON_FORCE_OBJECT);
            break;
    }
} else {
    die("Solicitud no válida.");
}


/** @var TYPE_NAME $products */

function ciudad_lista() {
    $datos = lista('data-1.json');
    $ciudades = array();
    foreach ($datos as $key => $value) {
        array_push($ciudades, $value['Ciudad']);
    }
    $ciudades = array_unique($ciudades);
    sort($ciudades);

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($ciudades, JSON_FORCE_OBJECT);
}

function tipo_lista() {
    $datos = lista('data-1.json');
    $tipos = array();
    foreach ($datos as $key => $value) {
        array_push($tipos, $value['Tipo']);
    }
    $tipos = array_unique($tipos);
    sort($tipos);

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($tipos, JSON_FORCE_OBJECT);
}


function lista($dir) {
    $data_file = fopen($dir, "r");
    $data_readed = fread($data_file, filesize($dir));
    $data = json_decode($data_readed, true);
    fclose($data_file);
    return $data;
}
