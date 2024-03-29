import {useState} from "react"
import { createText, updateText } from "../../api/textService";
import { Grid, Button, TextField, Typography } from "@mui/material";

const TextForm = ({ existingText = {}, updateCallback}) => {
    const [title, setTitle] = useState(existingText.title || "")
    const [text, setText] = useState(existingText.text || "")

    const updating = Object.entries(existingText).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            text
        };

        try {
            if (updating) {
                await updateText(existingText.id, data);
            } else {
                await createText(data);
            }
            updateCallback();
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    };

    return (
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {updating ? "Update Text" : "Create Text"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="text"
                label="Text"
                fullWidth
                multiline
                minRows={2}
                maxRows={30}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {updating ? "Update" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </form>
      );
    };

export default TextForm