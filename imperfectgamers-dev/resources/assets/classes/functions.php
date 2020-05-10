<?php


class functions {
    function shareContent() {
        if(__DIR__) {
            return basename(__DIR__);
        }
        else {
            echo 'lol';
        }
    }



}

