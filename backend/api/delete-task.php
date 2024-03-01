<?php

$deleted_task = (int) $_POST['index'];

// recupero il fil json
$json_todolist = file_get_contents('../data/todolist.json');

// lo trasformo in un array PHP
$todolist_array = json_decode($json_todolist);

// elimino il task dall'array
unset($todolist_array[$deleted_task]);

// riordino gli indici
$todolist_array = array_values($todolist_array);


// ritrasformo l'array in file json
$json_result = json_encode($todolist_array);

// sovrascrivo il file json nel suo percorso
file_put_contents('../data/todolist.json', $json_result);

// avviso il browser dell'invio del file
header('Content-Type: application/json');

// stampo i dati (la stringa json) da visualizzare
echo $json_result;