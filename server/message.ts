export const getMessageByChatId = async (chatId: string) => {
    try {
        const response = await fetch(`https://localhost:7222/api/Message/conversation/${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return null;
    }
}

export const sendMessage = async (chatId: number, content: string) => {
    try {7222
        const response = await fetch(`https://localhost:7222/api/Message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ conversationId: chatId, content: content })
        });
        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error sending message:', error);
        return null;
    }
}

export const deleteMessage = async (messageId: string) => {
    try {
        const response = await fetch(`https://localhost:7222/api/Message/${messageId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete message');
        }
        return true;
    } catch (error) {
        console.error('Error deleting message:', error);
        return false;
    }
}