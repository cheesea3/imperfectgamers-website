<?php declare(strict_types = 1);

namespace igmain\Page;

interface PageReader
{
    public function readBySlug(string $slug) : string;
}