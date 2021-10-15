<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    	<meta name="csrf-token" content="{{ csrf_token() }}">

        <link href="{{ url("/public/css/app.css") }}" rel="stylesheet">


                        @php

                      //  return dd(session()->get('locale'));
                            if(Session::has('locale')){

                                $locale = Session::get('locale', Config::get('app.locale'));

                            }
                            else{
                                $locale = "en";
                            }

                        @endphp

        {{-- @if($locale == "en")
        <link href="{{ asset("/css/bootstrap.min.css") }}" rel="stylesheet">

        @else
        <link href="{{ asset("/css/bootstrap.rtl.min.css") }}" rel="stylesheet">


        @endif --}}

</head>
<body>

    <div id="app">

    </div>

        <script src="{{ url("/public/js/app.js")}}"></script>
        <script src="{{ asset("/js/bootstrap.min.js")}}"></script>

</body>
</html>
