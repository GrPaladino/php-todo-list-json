<?php




// recupero il fil json
$json_todolist = file_get_contents('../data/todolist.json');

// lo trasformo in un array PHP
$todolist_array = json_decode($json_todolist);

// push nuovo item nell'array
$todolist_array[] = ["name" => $_POST['item'], "type" => false];



// ####### INCOMPLETA NON FUNZIONA
// if (!empty($_POST["index"])) {
//     $index = (int) $_POST["index"];
//     $todolist_array = array_splice($todolist_array, $index, 1);

// }
// ;

// ritrasformo l'array in file json
$json_result = json_encode($todolist_array);

// sovrascrivo il file json nel suo percorso
file_put_contents('../data/todolist.json', $json_result);

// avviso il browser dell'invio del file
header('Content-Type: application/json');

// stampo i dati (la stringa json) da visualizzare
echo $json_result;