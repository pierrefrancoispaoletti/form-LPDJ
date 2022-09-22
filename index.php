<?php 


//allow post headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-methods: GET, POST, PUT, DELETE, OPTIONS");


echo require("form/index.html");