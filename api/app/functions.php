<?php
namespace API\Helpers;

function starts_with($haystack, $needle, $case_sensitive = true)
{
    if ($case_sensitive) {
        return strpos($haystack, $needle) === 0;
    } else {
        return stripos($haystack, $needle) === 0;
    }
}
