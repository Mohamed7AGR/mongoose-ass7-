import { Router } from "express";
import { userService } from "../index.js";
import { successResponse, errorResponse } from "../../common/utils/index.js";
export const userRouter = Router();

//signup
userRouter.post("/signup", async (req, res) => {
  try {
    await userService.signUp({ data: req.body });
    return successResponse(res, "User added successfully.");
  } catch (error) {
    const status = error.message === "Email already exists." ? 409 : 500;
    return errorResponse(res, error.message);
  }
});

//login
userRouter.post("/login", async (req, res) => {
  try {
    await userService.login({ data: req.body });
    return successResponse(res, "Login successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
});

//getuser
userRouter.get("/", async (req, res) => {
  try {
    let user = await userService.getUser({ id: req.query.id });
    return successResponse(res, user);
  } catch (error) {
    const status = error.message === "User not found" ? 404 : 500;
    return errorResponse(res, error.message, status);
  }
});
//update user
userRouter.patch("/:id", async (req, res) => {
  try {
    await userService.updateUser({ id: req.params.id, data: req.body });
    return successResponse(res, "User updated successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
});
//delete user
userRouter.delete("/", async (req, res) => {
  try {
    await userService.deleteUser({ id: req.query.id });
    return successResponse(res, "User deleted");
  } catch (error) {
    const status = error.message === "User not found" ? 404 : 500;
    return errorResponse(res, error.message, status);
  }
});
