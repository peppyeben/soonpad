import React, { useState, useRef } from "react";
import Image from "next/image";

// Type definition for ImageUploader props
interface ImageUploaderProps {
    // onImageUpload: (id: string, file: File | null) => void;
    onImageUpload: (id: string, akordId: string | null) => void;
    label: string;
    id: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    onImageUpload,
    label,
    id,
}) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const file = files?.[0];
        if (file) {
            // Validate file type and size
            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/gif",
                "image/webp",
            ];
            const maxSize = 1 * 1024 * 1024; // 1MB

            if (!allowedTypes.includes(file.type)) {
                alert(
                    "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."
                );
                return;
            }

            if (file.size > maxSize) {
                alert("File is too large. Maximum size is 1MB.");
                return;
            }

            setSelectedImage(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = e.target?.result as string;

                const response = await fetch("https://api.akord.com/files", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Api-Key": process.env
                            .NEXT_PUBLIC_AKORD_API_KEY as string,
                        "Content-Type": "text/plain",
                    },
                    body: data,
                }).then((res) => res.json());

                onImageUpload(id, response.id);
            };
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Call parent component's upload handler
            // onImageUpload(id, file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleImageChange({
                target: { files },
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        onImageUpload(id, null);
    };

    return (
        <div
            className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer hover:border-[#008F00] transition-colors"
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept=".jpg,.jpeg,.png,.gif,.webp"
                className="hidden"
            />

            {previewUrl ? (
                <div className="relative w-full h-64">
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        style={{ objectFit: "contain" }}
                        className="mx-auto"
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeImage();
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <div>
                    <p className="text-gray-600">
                        Drag and drop or click to upload {label}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        Supported formats: JPEG, PNG, GIF, WebP (Max 1MB)
                    </p>
                </div>
            )}
        </div>
    );
};
