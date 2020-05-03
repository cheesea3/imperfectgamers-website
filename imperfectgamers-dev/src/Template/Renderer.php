<?php declare(strict_types = 1);

namespace igmain\Template;

interface Renderer
{
    public function render($template, $data = []) : string;
}