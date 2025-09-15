<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;

class GroupController extends Controller
{

    public function index()
{
    $groups = Group::with('category')->get()->map(function($group) {
        return [
            'id_group' => $group->id_group,
            'name_group' => $group->name_group,
            'description_group' => $group->description_group,
            'categorie_id' => $group->categorie_id,
            'name_categorie' => $group->category->name_categorie ?? null,
        ];
    });

    return response()->json(['data' => $groups]);
}
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_group' => 'required|string|max:255',
            'description_group' => 'required|string',
            'categorie_id' => 'required|exists:categories,id_categorie',
        ]);

        $group = Group::create($validated);

        return response()->json(['message' => 'Group created successfully', 'data' => $group], 201);
    }

    public function show($id)
    {
        $group = Group::with('category')->findOrFail($id);
        return response()->json(['data' => $group]);
    }

    public function update(Request $request, $id)
    {
        $group = Group::findOrFail($id);

        $validated = $request->validate([
            'name_group' => 'required|string|max:255',
            'description_group' => 'required|string',
            'categorie_id' => 'required|exists:categories,id_categorie',
        ]);

        $group->update($validated);

        return response()->json(['message' => 'Group updated successfully', 'data' => $group]);
    }

    public function destroy($id)
    {
        $group = Group::findOrFail($id);
        $group->delete();

        return response()->json(['message' => 'Group deleted successfully']);
    }
}
