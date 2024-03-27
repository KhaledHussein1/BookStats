import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ReadabilityTable = ({readabilityScores}) => {
    function createData(test, score) 
        {
            return { test, score };
      }

    const rows = Object.keys(readabilityScores).map(key => createData(key, readabilityScores[key]));

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Readability Test</TableCell>
                <TableCell align="center">Score</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row, index) => (
                <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.test}
                </TableCell>
                <TableCell align="center">{row.score}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default ReadabilityTable;