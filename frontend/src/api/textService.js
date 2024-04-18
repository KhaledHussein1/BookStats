const BASE_URL = "";

// CRUD operations with JWT
export const fetchTexts = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${BASE_URL}/texts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error fetching texts:", error);
        throw error;
    }
};

export const createText = async (textData) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${BASE_URL}/create_text`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(textData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating text:", error);
        throw error;
    }
};

export const updateText = async (textId, textData) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${BASE_URL}/update_text/${textId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(textData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating text:", error);
        throw error;
    }
};

export const deleteText = async (textId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${BASE_URL}/delete_text/${textId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Error deleting text:", error);
        throw error;
    }
};

export const analyzeText = async (textId) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${BASE_URL}/analysis/${textId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error analyzing text:", error);
        throw error;
    }
};

export const demo = async () => {
    try {
        const response = await fetch(`${BASE_URL}/file-analysis`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error analyzing text from file:", error);
        throw error;
    }
};
