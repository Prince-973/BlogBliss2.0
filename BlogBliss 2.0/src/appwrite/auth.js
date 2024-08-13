import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("AppWwrite service Error::createAccount error ::", error);
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      if (session) {
        return await this.getCurrentUser();
      } else {
        console.log(
          "AppWwrite service Error::login error :: Session not created"
        );
        return null;
      }
    } catch (error) {
      console.log("AppWwrite service Error::login error ::", error);
      return null;
    }
  }

  async getCurrentUser() {
    try {
      const session = await this.account.getSession("current");
      if (session) {
        return await this.account.get();
      } else {
        throw new Error("No active session found.");
      }
    } catch (error) {
      console.log("AppWwrite service Error::getUser error ::", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("AppWwrite service Error::logout error ::", error);
    }
  }
}

const authService = new AuthService();

export default authService;
