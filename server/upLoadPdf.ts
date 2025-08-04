export const addPdf = async (file: File) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No authentication token found');
        return false;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://127.0.0.1:8000/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('PDF upload failed');
        }

        const data = await response.json();
        console.log('PDF uploaded successfully:', data);
        return true;
    } catch (error) {
        console.error('Error uploading PDF:', error);
        return false;
    }
}