import { getAllUsers, updateUserByAdmin, deleteUser } from "./dashboardService.js";

export async function getAllUsersController(currentUserRole) {
  try {
    if (currentUserRole !== "admin") {
      return { success: false, message: "Access denied" };
    }

    return await getAllUsers();

  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function updateUserController(currentUserRole, uid, updatedData) {
  try {
    if (currentUserRole !== "admin") {
      return { success: false, message: "Access denied" };
    }

    return await updateUserByAdmin(uid, updatedData);

  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function deleteUserController(currentUserRole, uid) {
  try {
    if (currentUserRole !== "admin") {
      return { success: false, message: "Access denied" };
    }

    return await deleteUser(uid);

  } catch (error) {
    return { success: false, message: error.message };
  }
}