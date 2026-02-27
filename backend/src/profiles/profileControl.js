import { uploadProfileImage } from "./storageService.js";
import { updateProfile } from "./profileService.js";

export async function uploadAndSaveProfileImage(uid, file) {
  try {
    const uploadResult = await uploadProfileImage(uid, file);

    if (!uploadResult.success) {
      return uploadResult;
    }

    await updateProfile(uid, {
      profileImage: uploadResult.url
    });

    return { success: true };

  } catch (error) {
    return { success: false, message: error.message };
  }
}