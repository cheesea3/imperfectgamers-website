<?php declare(strict_types = 1);

namespace igmain\Menu;

interface MenuReader
{
    public function readMenu() : array;
}