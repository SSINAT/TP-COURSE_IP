<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Get the uploaded file
        $image = $request->file('image');
        $fileName = uniqid().'.'.$image->getClientOriginalExtension();

        // Store original image in Minio
        $originalPath = $image->storeAs('uploads', $fileName, 'minio');

        // Create thumbnail using Intervention Image
        $thumbnail = Image::make($image->getRealPath());
        $thumbnail->fit(200, 200, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        // Store thumbnail in Minio (via temporary local storage)
        $thumbnailPath = 'thumbnails/'.$fileName;
        $tempPath = storage_path('app/public/temp/'.$fileName);
        
        // Ensure temp directory exists
        if (!file_exists(dirname($tempPath))) {
            mkdir(dirname($tempPath), 0755, true);
        }

        $thumbnail->save($tempPath);
        Storage::disk('minio')->put($thumbnailPath, file_get_contents($tempPath));
        
        // Clean up temporary file
        unlink($tempPath);

        // You might want to store these paths in your database
        $fileData = [
            'original' => $originalPath,
            'thumbnail' => $thumbnailPath,
            'url' => Storage::disk('minio')->url($originalPath),
            'thumbnail_url' => Storage::disk('minio')->url($thumbnailPath)
        ];

        return redirect()->back()
               ->with('success', 'Image uploaded successfully!')
               ->with('fileData', $fileData);
    }
}