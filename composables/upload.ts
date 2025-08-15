import axios from 'axios';
import FormData from "form-data";

export const addPdf = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const config = useRuntimeConfig();

    try {
        const res = await axios.post(`${config.public.apiBaseBot}/upload`, formData);
        console.log('PDF uploaded successfully:', res.data);
    } catch (error) {
        console.error('Error uploading PDF:', error);
    }
}