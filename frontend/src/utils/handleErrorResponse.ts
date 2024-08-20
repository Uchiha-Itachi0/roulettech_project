interface ErrorResponse {
    error: {
        [key: string]: string[];
    };
}

const handleResponseError = (error: any) => {
    let errorMessage = 'An unexpected error occurred';

    if (error.response && error.response.data) {
        const data: ErrorResponse = error.response.data;

        if (data.error) {
            const errors = data.error;
            // Check if it's an array, object, or string, and handle accordingly
            if (typeof errors === 'object') {
                errorMessage = Object.values(errors).flat().join(', ');
            } else {
                errorMessage = errors as string;
            }
        } else if (typeof data === 'string') {
            errorMessage = data;
        } else {
            errorMessage = 'Error occurred during the request';
        }
    } else if (typeof error.message === 'string') {
        errorMessage = error.message;
    }

    return errorMessage;
};



export default handleResponseError;