import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { deleteText, analyzeText } from "../../api/textService";
import { Typography, CircularProgress ,Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InsightsIcon from '@mui/icons-material/Insights';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';

const MAX_PREVIEW_LENGTH = 110;

const TextList = ({texts, updateText, updateCallback }) => {
    const navigate = useNavigate();
    const [loadingState, setLoadingState] = useState({});

    const onDelete = async (id) => {
        try {
            await deleteText(id);
            updateCallback();
        } catch (error) {
            console.error("Error deleting text:", error);
        }
    };

    const onAnalyze = async (id) => {
        try {
            setLoadingState(prevState => ({ ...prevState, [id]: true })); // Set loading state for specific text to true
            const analysisData = await analyzeText(id);
            console.log("Analysis data:", analysisData);
            navigate('/analysis-results', { state: analysisData });
        } catch (error) {
            console.error("Error analyzing text:", error);
        } finally {
            setLoadingState(prevState => ({ ...prevState, [id]: false })); // Reset loading state for specific text
        }
    };

    const truncateText = (text) => {
        return text.length > MAX_PREVIEW_LENGTH ? text.substring(0, MAX_PREVIEW_LENGTH) + '...' : text;
    };

    return (
        <div>
        <TableContainer component={Paper} sx={{ border: `7px solid ${blue[500]}` }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h5">Title</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5">Content</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5">Actions</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {texts.map((text) => (
                        <TableRow key={text.id}>
                            <TableCell>
                            <Typography variant="body1">{text.title}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">{truncateText(text.text)}</Typography>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => onAnalyze(text.id)} variant="outlined" disabled={loadingState[text.id]} startIcon={<InsightsIcon />}>
                                    {loadingState[text.id] ? <CircularProgress size={24} /> : "Analyze"}
                                </Button>
                                <Button onClick={() => updateText(text)} variant="outlined" startIcon={<EditIcon />}>
                                    Update
                                </Button>
                                <Button onClick={() => onDelete(text.id)} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    )
}

export default TextList