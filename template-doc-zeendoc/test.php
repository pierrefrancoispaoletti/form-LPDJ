<?php 

$html = "";
$html .= <<<EOF
<!-- EXAMPLE OF CSS STYLE -->
<style>
.header {
    position: relative;
}

.header-image {
    position: absolute;
    top: 0;
    left: 0;
}

.header-title {
    text-align: center;
    text-transform: uppercase;
}
</style>

<div class="header">
        <div class="header-image">
            <img src="form/images/logo.png" alt="">
        </div>
        <div class="header-title">
            <h1>Bon de commande</h1>
        </div>
</div>
EOF;