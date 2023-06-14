import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Container,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import axios from "axios";
import { toast } from "react-toastify";

const columns = [
  { id: "name", label: "Submitted By", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "comment",
    label: "Feedback",
    minWidth: 200,
  },
  {
    id: "",
    label: "File",
    minWidth: 100,
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function FeedbacksTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [feedbacks, setFeedbacks] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchFeedbacks = () => {
    axios
      .get("/admin/getAllFeedback")
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const downloadPdf = (id) => {
  //   axios
  //     .get(`/feedback/file/${id}`)
  //     .then((res) => toast.success("File Downloading", { autoClose: 1000 }))
  //     .catch((err) => {
  //       toast.error("Something Went Wrong", { autoClose: 1000 });
  //       console.log(err);
  //     });
  // };

  React.useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: "1rem" }}>
        Feedbacks
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500, width: "100%" }}>
          <Table stickyHeader aria-label="sticky table" sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}

                      <TableCell>
                        {row.pdf ? (
                          <IconButton
                            href={`http://localhost:8080/api/feedback/file/${row.id}`}
                          >
                            <DownloadForOfflineIcon />
                          </IconButton>
                        ) : (
                          "No File"
                        )}
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={feedbacks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
