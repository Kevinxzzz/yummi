import axios from "axios";
import type { CreateUser, LoginResponse, UserType } from '@/types/user';
const API_URL = 'http://localhost:3000/users';

export const getUser = async (id) => {
    try{
        const user =  await axios.get<UserType>(`${API_URL}/${id}`);
        return user.data;
    }catch (error){
        throw new Error('Error while trying to get user.');
    }

};

export const postUser = async (data: CreateUser) => {

    try{
        const newUser = await axios.post<CreateUser>(`${API_URL}`,data);
        return newUser.data;
    }catch (error){
        
        throw new Error('Error to creating a new user');
    }
}

export const loginUser = async (data) => {
    try{
        const login = await axios.post<LoginResponse>(`${API_URL}/login`,data);
        return login.data;
    }catch (error) {
        throw new Error('Error while trying to log in.');
    }
}

export const deleteUser = async (userId: number, token: string) => {
    try{
        await axios.delete(`${API_URL}/${userId}`);
    }catch (error) {
        throw new Error('Error while trying to delete user.');
    }
}