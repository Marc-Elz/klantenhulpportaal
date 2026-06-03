<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyCategoryRequest;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryRecource;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Http\Exceptions\HttpResponseException;



class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::all();
        return CategoryRecource::collection($categories);
    }

    public function store(StoreCategoryRequest $request)
    {
        Category::create($request->validated());

        $categories = Category::all();
        return CategoryRecource::collection($categories);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $validatedData = $request->validated();
        $category->update($validatedData);

        $categories = Category::all();
        return CategoryRecource::collection($categories);
    }

    public function destroy(DestroyCategoryRequest $request, Category $category)
    {
        // TODO check if tickets with categories exist if true throw exception to display
        $category->tickets()->detach();
        $category->delete();

        // if (!$user->role === 'admin') {
        //     throw new HttpResponseException(response()->json([
        //         'message' => 'Category kon niet worden verwijderd door non-admin gebruiker'
        //     ], 403));
        // }
        return response()->json(['message' => 'Category succesvol verwijderd']);
    }
}
