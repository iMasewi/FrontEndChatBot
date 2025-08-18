export const getMessageByChatId = async (chatId: string) => {
    try {
        const { $api } = useNuxtApp();

        const response = await $api.get(`/Message/conversation/${chatId}`);
        if (!response.data) {
            throw new Error('Failed to fetch messages');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return null;
    }
}

export const sendMessage = async (chatId: number, content: string) => {
    try {
        const { $api } = useNuxtApp();

        const response = await $api.post('/Message', {
            conversationId: chatId,
            content: content
        });
        if (!response.data) {
            throw new Error('Failed to send message');
        }
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        return null;
    }
}

export const deleteMessage = async (messageId: string) => {
    try {
        const { $api } = useNuxtApp();

        const response = await $api.delete(`/Message/${messageId}`);
        if (!response.data) {
            throw new Error('Failed to delete message');
        }
        return true;
    } catch (error) {
        console.error('Error deleting message:', error);
        return false;
    }
}