import Config from "../ConfigEnviornment/Config";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        
        .setEndpoint(Config.appWriteUrl)
        .setProject(Config.appWriteProjectId);
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // creating a method for user to creatPost 

    async createPost({Title, slug, Content, featuredImage, Status, userId}){
        try {
            return await this.databases.createDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                // treating slug as documnet id you can also use id.unique method to genrate unique doucumnet id 
                slug,   
                {
                    Title: Title, // Ensure 'Title' attribute matches what the server expects
                    Content: Content, // Adjust other attribute names if necessary
                    featuredImage: featuredImage,
                    Status: Status,
                    userId: userId
                }

            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }

    }

    // creating  a method for user to updatePost 

    async updatePost (slug,{Title, Content, featuredImage, Status}){
        try {
            return await this.databases.updateDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                slug,
                {
                    Title,
                    Content,
                    Status,
                    featuredImage,

                }
            )
        } catch (error) {
            console.log("Appwrite services :: updatePost :: error", error);
        }

    }

    // creating a method for user to deletePost

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                slug
            )
            return true;
            
        } catch (error) {
            console.log("Appwrite services :: deletePost :: error", error);
            return false
        }
    }

    // creating a method for user to recover a single post 

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite services :: getPost :: error", error);
            return false
        }
    }

    // creating a method for user to recover multiple active Status  post 

    async getPosts(queries  = [Query.equal("Status", "active")]){
        try {
            return await this.databases.listDocuments(
                Config.appWriteDatabaseId,
                Config.appWriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite :: getPosts :: error", error);
            return false
        }

    }

    // creating a method for user to upload file 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                Config.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    // creating a method for user to delete file 

    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile(
                Config.appWriteBucketId,
                fileID
            )
        
        } catch (error) {
            console.log("Appwrite services :: deleteFile :: error", error);
            return false
        }
    }

    // creating a method for user to preveiw the file, we do not need async cz this method already fast you can use it async also 
    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            Config.appWriteBucketId,
            fileID
        )
    }

    
}

const service = new Service()

export default service;