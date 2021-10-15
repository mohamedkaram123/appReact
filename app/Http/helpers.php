<?php


if (!function_exists('responseJson')) {

    function responseJson($status, $message, $data = null)
    {
        $response = [
            'status' => $status,
            'msg' => $message,
            'data' => $data
        ];
        return response()->json($response);
    }
}


if (!function_exists('translate_data')) {

    function translate_data($data, $lang = null)
    {
        if ($lang == null) {
            $lang = App::getLocale();
        }

        foreach ($data as $key => $value) {
            $translation_def = Translation::where('lang', env('DEFAULT_LANGUAGE', 'en'))->where('lang_key', $key)->first();
            if ($translation_def == null) {
                $translation_def = new Translation;
                $translation_def->lang = env('DEFAULT_LANGUAGE', 'en');
                $translation_def->lang_key = $key;
                $translation_def->lang_value = $key;
                $translation_def->save();
            }
            //Check for session lang

            $lang_value_data = "";
            $translation_locale = Translation::where('lang_key', $key)->where('lang', $lang)->first();
            if ($translation_locale != null && $translation_locale->lang_value != null) {
                $lang_value_data =  $translation_locale->lang_value;
            } elseif ($translation_def->lang_value != null) {
                $lang_value_data =  $translation_def->lang_value;
            } else {
                $lang_value_data =  $key;
            }

            $data[$key] = $lang_value_data;
        }


        return $data;
    }
}
