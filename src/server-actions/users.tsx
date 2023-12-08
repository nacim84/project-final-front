"use server"

import { IResponseBack } from "@/models/common.model";
import { TContactSchema, TUserSchema } from "@/models/common.schema";
import { faker } from "@faker-js/faker";
import prisma from "@/lib/prisma";
import { keccak256 } from 'viem';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const addUserToDb = async (formData: TUserSchema): Promise<IResponseBack> => {
 const urlAvatar = faker.image.avatarGitHub();
 const dateBirth = new Date(1984, 1, 28).toISOString();
 try {
  const newUser = {
   addressHash: keccak256(formData.address as `0x${string}`),
   firstName: formData.firstName,
   lastName: formData.lastName,
   email: formData.email,
   dateBirth: dateBirth,
   role: formData.role,
   image: urlAvatar
  };
  const savedUser = await prisma.user.create({ data: newUser });
  console.log(`Created user with id: ${savedUser.id}`)

  return { flag: true, data: savedUser };
 } catch (err) {
  console.error("Not found user : error : ", (err as PrismaClientKnownRequestError).message);

  return { flag: false, error: (err as PrismaClientKnownRequestError).message };
 }
};

export const deleteUserFromDb = async (userId: number) => {
 try {
  const deletedUser = await prisma.user.delete(
   {
    where: {
     id: userId,
    },
   });
  console.log(`Deleted user with id: ${deletedUser.id}`)
  return { flag: true, data: deletedUser };
 } catch (err) {
  console.error(`Deleted user with id ${userId} failed, error : `, (err as PrismaClientKnownRequestError).message);

  return { flag: false, error: (err as PrismaClientKnownRequestError).message };
 }
};

export const sendEmail = async (formData: TContactSchema): Promise<IResponseBack> => {
 console.log("formData : ", formData);
 return { flag: true };;
};