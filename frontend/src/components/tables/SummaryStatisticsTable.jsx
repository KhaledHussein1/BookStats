import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SummaryStatisticsTable = ({summaryStatistics}) => {
    function createData(name, value) 
        {
            return { name, value };
      }

    const rows = [
        createData('Mean', summaryStatistics[0]),
        createData('Median', summaryStatistics[1]),
        createData('Mode Value(s)', summaryStatistics[2].join(', ')),
        createData('Standard Deviation', summaryStatistics[3]),
        createData('Variance', summaryStatistics[4]),
      ];

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Statistic</TableCell>
                <TableCell align="middle">Value</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="middle">{row.value}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default SummaryStatisticsTable;