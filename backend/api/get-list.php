<?php

// prendo il file json
$json_list_content = file_get_contents("../data/todolist.json");

//  lo trasformo in array PHP
$todo_array = json_decode($json_list_content, true);

// applico logica e controlli
$todo_array = array_filter($todo_array, fn($item) => !empty ($item["name"]));


// trasformo l'array in una stringa json
$todo_json = json_encode($todo_array);

// avviso il browser dell'invio del file
header('Content-Type: application/json');

// stampo i dati (la stringa json) da visualizzare
echo $todo_json;