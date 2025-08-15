import { TokenStorage } from "../utils/tokenStorage";

export const getChatHistory = async () => {
    try {
        const { $api } = useNuxtApp();

        const response = await $api.get('/Conversation/user',);  
        if (!response.data) {
            throw new Error('Failed to fetch chat history');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching chat history:', error);
        return null;
    }
}

export const createChat = async (title: string) => {
    try {
        const { $api } = useNuxtApp();

        const response = await $api.post('/Conversation', {
            title
        });
        if (!response.data) {
            throw new Error('Failed to create chat');
        }
        return response.data;
    } catch (error) {
        console.error('Error creating chat:', error);
        return null;
    }
}
export const deleteChat = async (chatId: string) => {
    try {
        const { $api } = useNuxtApp();

        const response = await $api.delete(`/Conversation/${chatId}`);
        if (!response.data) {
            throw new Error('Failed to delete chat');
        }
        return true;
    } catch (error) {
        console.error('Error deleting chat:', error);
        return false;
    }
}
export const countChats = async () => {
    try {
        const { $api } = useNuxtApp();

        const response = await $api.get('/Conversation/count');
        if (!response.data) {
            throw new Error('Failed to count chats');
        }
        return response.data.count;
    } catch (error) {
        console.error('Error counting chats:', error);
        return 0;
    }
}