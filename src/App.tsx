import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { DATA } from "./mockup";

function App() {
  const header = ["Year", "Title", "Description"];
  const [searchTxt, setSearchTxt] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredData = React.useMemo(() => {
    if (!searchTxt) {
      return DATA;
    }

    const lowerCaseFilter = searchTxt.toLowerCase();
    return DATA.filter((item: any) =>
      Object.keys(item).some((key: any) =>
        String(item[key]).toLowerCase().includes(lowerCaseFilter)
      )
    );
  }, [DATA, searchTxt]);

  return (
    <Paper
      sx={{
        width: "96%",
        overflow: "hidden",
        margin: "20px auto auto auto",
        padding: "10px",
      }}
    >
      <TextField
        label="Search"
        style={{ width: "100%", marginBottom: 10 }}
        variant="outlined"
        onChange={(e: any) => setSearchTxt(e.target.value)}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {header.map((item, key) => (
                <TableCell key={key}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={DATA.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default App;
