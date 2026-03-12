const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

export async function uploadProfilePhoto(file: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary is not configured.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "taskflow/avatars");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(CLOUD_NAME)}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = (await res.json()) as { secure_url: string };
  return data.secure_url;
}

export async function uploadChatFile(
  file: File,
): Promise<{ url: string; type: "image" | "file" }> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary is not configured.");
  }

  const image = isImageFile(file);
  const resourceType = image ? "image" : "raw";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "taskflow/chat");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${encodeURIComponent(CLOUD_NAME)}/${resourceType}/upload`,
    { method: "POST", body: formData },
  );

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = (await res.json()) as { secure_url: string };
  return { url: data.secure_url, type: image ? "image" : "file" };
}
