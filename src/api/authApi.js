import { GraphQLClient, gql } from 'graphql-request'
import { createAsyncThunk } from '@reduxjs/toolkit'

const endpoint = 'http://localhost:4000/graphql'


export const loginUserCognito = createAsyncThunk(

    'user/login',
        async (payload, thunkAPI) => {  

            const graphQLClient = new GraphQLClient(endpoint, {
                credentials: 'include',
            });
         
            const mutation = gql`
            mutation ( $email: String!, $password: String!){
                loginUser(userInput: {email : $email, password: $password}){
                    email,id, 
                }
            }      
            `
            const variables = {
                email: payload.email ,//'s1ss@gmail.com',
                password: payload.password //'Sada9290!',
            }
            const data = await graphQLClient.request(mutation, variables)
        
            return JSON.stringify(data, undefined, 2);
        }          
    
);


export const SignUpUserCognito = createAsyncThunk(

    'user/signUp',
        async (payload) => {  

            const graphQLClient = new GraphQLClient(endpoint, {
                credentials: 'include',
            });
         
        
            const mutation = gql`
            mutation {
                signUpUser($userInput: {$email : String!, $password: String!, $user_name: String!})  
            }
            `
            const variables = {
                email: payload.email ,//'s1ss@gmail.com',
                password: payload.password ,//'Sada9290!',
                user_name: payload.username
            }
            const data = await graphQLClient.request(mutation, variables)
        
            return JSON.stringify(data, undefined, 2);
        }          
    
);


export const SignOutUserCognito = createAsyncThunk(

    'user/signOut',
        async () => {  

           const graphQLClient = new GraphQLClient(endpoint, {
                credentials: 'include',
            });
         
        
            const mutation = gql`
            mutation {
                signOutUser  
            }
            `     
            const data = await graphQLClient.request(mutation)
        
            return JSON.stringify(data, undefined, 2);
        }          
    
);

export const getUser = createAsyncThunk(

    'user/getUser',
        async () => {  

            const graphQLClient = new GraphQLClient(endpoint, { credentials: 'include' });
        
            const query = gql`
           query{
                user{
                    email,
                    password,
                    user_name
                }
            }`
            const data = await graphQLClient.request(query)
        
            return JSON.stringify(data, undefined, 2);
        }          
    
);


