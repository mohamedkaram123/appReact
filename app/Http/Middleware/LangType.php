<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LangType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        app()->setlocale("ar");

        if (!empty($request->header('Accept-Language')) && $request->header('Accept-Language') == "en") {
            app()->setlocale("en");
        }
        return $next($request);
    }
}
