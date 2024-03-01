<?php

// dichiaro l'index in una variabile
$updated_task_index = (int) $_POST['index'];

// dichiaro la task modificata
$updated_task = [
    "name" => $_POST['text'],
    "type" => $_POST['type'] === 'true'
];

// recupero il fil json
$json_todolist = file_get_contents('../data/todolist.json');

// lo trasformo in un array PHP
$todolist_array = json_decode($json_todolist);

// modifico lo status della task
$todolist_array[$updated_task_index] = $updated_task;

// ritrasformo l'array in file json
$json_result = json_encode($todolist_array);

// sovrascrivo il file json nel suo percorso
file_put_contents('../data/todolist.json', $json_result);

// avviso il browser dell'invio del file
header('Content-Type: application/json');

// stampo i dati (la stringa json) da visualizzare
echo $json_result;