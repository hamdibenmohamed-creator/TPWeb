<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
class NoteController extends Controller
{
    public function index(){
        return Note::where('user_id', auth()->id())->get();
    }
public function store(Request $request)
{
$request->validate([
       'priority' => 'required|in:Basse,Moyenne,Haute,moyenne,haute',
    ], [
        'priority.in' => 'The priority must be either Basse, Moyenne, or Haute.'
    ]);

    Note::create([
        'title' => $request->title,
        'content' => $request->content,
        'priority' => $request->priority,
        'user_id' => $request->user()->id
    ]);

    return response()->json(['message' => 'Note created successfully']);
}
    public function update(Request $request,$id){
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'priority' => 'required|in:Basse,Moyenne,Haute,moyenne,haute',
        ]);

        $note = Note::findOrFail($id);

        // Ensure the note belongs to the authenticated user
        if ($note->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $note->update($request->only(['title', 'content', 'priority']));
        return response()->json(['message' => 'Note updated successfully']);
    }
    public function destroy($id){
        $note = Note::findOrFail($id);

        // Ensure the note belongs to the authenticated user
        if ($note->user_id !== request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $note->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
