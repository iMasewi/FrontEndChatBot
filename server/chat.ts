export const getChatHistory = async () => {
    try {
        const response = await fetch(`https://localhost:7222/api/Conversation/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch chat history');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chat history:', error);
        return null;
    }
}

export const createChat = async (title: string) => {
    try {
        const response = await fetch(`https://localhost:7222/api/Conversation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title })
        });
        if (!response.ok) {
            throw new Error('Failed to create chat');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating chat:', error);
        return null;
    }
}
export const deleteChat = async (chatId: string) => {
    try {
        const response = await fetch(`https://localhost:7222/api/Conversation/${chatId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
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
        const response = await fetch(`https://localhost:7222/api/Conversation/count`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to count chats');
        }
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error('Error counting chats:', error);
        return 0;
    }
}