export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
// Preflight only. Future server upload authorization must repeat this check,
// parse GLB/glTF contents, and verify compression and all referenced resources.
export function validateUpload(file: { name: string; size: number }) {
  if (!Number.isFinite(file.size) || file.size <= 0)
    throw new Error("File must be nonempty.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("File exceeds 50 MiB.");
  if (!/\.(glb|gltf)$/i.test(file.name))
    throw new Error("Only GLB and glTF files are supported.");
  return true;
}
