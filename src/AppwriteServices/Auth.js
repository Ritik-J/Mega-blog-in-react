import Config from "../ConfigEnviornment/Config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(Config.appWriteUrl)
        .setProject(Config.appWriteProjectId);
        this.account = new Account(this.client);
    }

    // creating a signup method for user 
    async createAccount({email, password, name}){
        console.log(email, password, name);
        try {
            const userAccount =  await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //if userAccount sucssfully created then send him to login page
                return this.login({email, password});

            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // creating a login method for a user 
    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    // creating a method to check if the currentuser is login or not 

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            // Log the full error object for further inspection
            console.log("Full error object:", error);
        }
    
        return null;
    }

    // creating a method to logout the user 

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService();

export default authService