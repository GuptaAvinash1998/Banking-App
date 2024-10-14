'use server';
import { cookies } from 'next/headers';
import {createAdminClient, createSessionClient} from '../appwrite'
import { ID } from 'node-appwrite';
import { parseStringify } from '../utils';

export const signIn = async({email, password}: SignUpParams) => {
    try{
        //Use AppWrite to create a user account
        const { account } = await createAdminClient();

        const response = await account.createEmailPasswordSession(email, password);

        return parseStringify(response);
    }catch(e){
        console.error(e);
    }
}

export const signUp = async(userData: SignUpParams) =>{
    try{
        //Use AppWrite to create a user account
        const { account } = await createAdminClient();

        const newUser = await account.create(ID.unique(), userData.email, userData.password, `${userData.firstName} ${userData.lastName}`);
        const session = await account.createEmailPasswordSession(userData.email, userData.password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    }catch(e){
        console.error(e);
    }
}

export const logOutAccount = async() =>{
    try{
        const { account } = await createAdminClient();

        cookies().delete('appwrite-session');

        await account.deleteSession('current');
    }catch(e){
        console.error(e);
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();

      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }
  