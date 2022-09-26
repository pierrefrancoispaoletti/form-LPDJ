<?php

[
    "refbdc" => $ref, "datedocument" => $date, "destinataire" => $destinataire, "devis" => $devis, "total_ht" => $total_ht, "total_cfp" => $total_cfp, "tva" => $tva, "user" => $user

] = $_POST;

$Lignes = [];

$keys = array_keys($_POST);

foreach ($keys as $key) {
    if (stristr($key, "Ligne")) {
        $explodedKey = explode("_", $key);
        $Lignes[$explodedKey[1]][$explodedKey[2]] = $_POST[$key];
    }
}
