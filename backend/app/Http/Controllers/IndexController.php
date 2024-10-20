<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index()
    {
        $users = User::all(); // Получаем всех пользователей
        return Inertia::render('Home', [
            'users' => $users, // Передаем пользователей на главную страницу
        ]);
    }
}
