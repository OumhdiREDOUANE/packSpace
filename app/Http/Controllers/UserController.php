<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
class UserController extends Controller
{
    // Afficher tous les utilisateurs
    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    // Créer un utilisateur
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nomComplet' => 'required|string|max:255',
            'numero_telephone' => 'required|string|max:20|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'in:admin,user',
            'remember_token' => Str::random(60),
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['remember_token'] = Str::random(60);
        $user = User::create($validated);

        return response()->json([
        'message' => 'User created successfully']);
    }

    // Afficher un utilisateur
    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    // Modifier un utilisateur
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'nomComplet' => 'sometimes|string|max:255',
            'numero_telephone' => 'sometimes|string|max:20|unique:users,numero_telephone,' . $user->id_user . ',id_user',
            'email' => 'sometimes|email|unique:users,email,' . $user->id_user . ',id_user',
            'password' => 'sometimes|string|min:6',
            'role' => 'in:admin,user',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json([
        'message' => 'User update successfully']);
    }

    // Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
