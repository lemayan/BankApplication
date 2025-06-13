'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";


export const signIn = async () => {
    try {
        // signIn logic here
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw error;
    }
};

export const signUp = async (userData: SignUpParams) => {
    try {
        const { email, password , firstName , lastName} = userData;
        if (!email || !password) {
            throw new Error("Email and password are required.");
        }
        const { account } = await createAdminClient();

        const newUserAccount= await account.create(ID.unique(),
        email, 
        password, 
        `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUserAccount);
    } catch (error) {
        console.error("Error during sign-up:", error);
        throw error;
    }
};

// ... your initialization functions

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch (error) {
        return null;
    }
}
