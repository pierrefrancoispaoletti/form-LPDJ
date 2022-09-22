<?php
require_once __DIR__ . '/TCPDF/tcpdf.php';
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

[
    "refbdc" => $ref, "datedocument" => $date, "destinataire" => $destinataire, "devis" => $devis, "total_ht" => $total_ht, "total_cfp" => $total_cfp, "tva"=> $tva, "user" => $user

] = $_POST;

$Lignes = [];

$keys = array_keys($_POST);

foreach ($keys as $key) {
    if(stristr($key, "Ligne")) {
        $explodedKey = explode("_", $key);
        $Lignes[$explodedKey[1]][$explodedKey[2]] = $_POST[$key];
    }
}

require_once(dirname(__FILE__) . '/template-doc-zeendoc/test.php');


$pdf->AddPage();

$pdf->writeHTML($html, true, false, true, false, '');
$pdf->Output(__DIR__."/test/test1.pdf", "D");
