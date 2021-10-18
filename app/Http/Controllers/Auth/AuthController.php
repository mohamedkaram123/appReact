<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //


    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|min:6'
        ], [
            'name.required' => trans("api.name_required"),
            'email.required' => trans("api.email_required"),
            'password.required' => trans("api.password_required"),
            // 'password.confirmed' => trans("api.password_confirmed"),
            'password.min' => trans("api.password_min"),

        ]);

        if ($validator->fails()) {

            return responseJson(0, $validator->errors());
        }
        $credentials = $request->only('email', 'password');
        if (\Auth::attempt($credentials)) {
            return responseJson(0, ["email" => [trans('api.user_exist')]]);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();
        $token = $user->createToken('userToken')->accessToken;
        $user["access_token"]  = $token;
        return responseJson(1, trans('api.user_register'), $user);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',

        ], [

            'email.required' => trans("api.email_required"),
            'password.required' => trans("api.password_required"),

        ]);


        if ($validator->fails()) {

            return responseJson(0, $validator->errors());
        }

        $credentials = $request->only('email', 'password');
        if (\Auth::attempt($credentials)) {
            $user = \Auth::user();
            $token = $user->createToken('userToken')->accessToken;
            $user["access_token"]  = $token;
            return responseJson(1, trans('api.user_is_login'), $user);
        }

        return responseJson(0, ["email" => [trans('api.user_not_register')]]);
    }
}
