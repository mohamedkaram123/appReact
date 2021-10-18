<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{


    public function changeLanguage(Request $request)
    {
        // return dd($request->lang);
        // session()->put('locale', $request->lang);
        //        \App::setLocale($request->lang);
        //return dd(session()->get('locale'));

        // return dd(\Config::get('app.locale'));
        return redirect()->route("home");
    }

    public function get_langs(Request $request)
    {
        $langs = Language::all();

        return responseJson(1, trans('api.done'), ["langs" => $langs, "check_lang" => session()->get("locale")]);
    }


    public function translate(Request $request)
    {
        return responseJson(1, trans('api.done'), translate_data($request->trans, $request->header('Accept-Language')));
    }


    public function translate_auth(Request $request)
    {
        return responseJson(1, trans('api.done'), translate_data($request->trans, $request->header('Accept-Language')));
    }
}
