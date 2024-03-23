const BASE_URL = "http://127.0.0.1:5000";

export const fetchTexts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/texts`);
        const data = await response.json();
        return data.texts;
    } catch (error) {
        console.error("Error fetching texts:", error);
        throw error;
    }
};

export const createText = async (textData) => {
    try {
        const response = await fetch(`${BASE_URL}/create_text`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(textData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating text:", error);
        throw error;
    }
};

export const updateText = async (textId, textData) => {
    try {
        const response = await fetch(`${BASE_URL}/update_text/${textId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(textData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating text:", error);
        throw error;
    }
};

export const deleteText = async (textId) => {
    try {
        const response = await fetch(`${BASE_URL}/delete_text/${textId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        return true;
    } catch (error) {
        console.error("Error deleting text:", error);
        throw error;
    }
};

export const analyzeText = async (textId) => {
    try {
        const response = await fetch(`${BASE_URL}/analysis/${textId}`, {
            method: "POST",
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        return await response.json();
    } catch (error) {
        console.error("Error analyzing text:", error);
        throw error;
    }
};
