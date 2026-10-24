import { usersModel } from "../../db/model/users.model.js";

async function checkEmailExists(email) {
  const existing = await usersModel.findOne({ email });
  if (existing) {
    throw new Error("Email already exists");
  }
}

export const signUp = async ({ data }) => {
  await checkEmailExists(data.email);
  return await usersModel.create(data);
};

export const login = async ({ data }) => {
  const user = await usersModel.findOne({ email: data.email });
  if (!user || user.password !== data.password) {
    throw new Error("Invalid email or password");
  }
  return user;
};

export const getUser = async ({ id }) => {
  const user = await usersModel.findById(id);
  if (!user) throw new Error("User Not found");
  return user;
};

export const updateUser = async ({ id, data }) => {
  const user = await usersModel.findById(id);
  if (!user) throw new Error("User not found");
  await checkEmailExists(data.email);
  return await usersModel.updateOne({ _id: id }, data, { runValidators: true });
};

export const deleteUser = async ({ id }) => {
  const user = await usersModel.findById(id);
  if (!user) throw new Error("User not found");
  await usersModel.deleteOne({ _id: id });
  return user;
};
