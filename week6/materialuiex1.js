import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Toolbar,
 Card,
 AppBar,
 CardHeader,
 CardContent,
 Typography,
} from "@mui/material";
import theme from "./theme";
const MaterialUIEx1Component = () => {
 return (
 <ThemeProvider theme={theme}>
 <AppBar color="secondary">
 <Toolbar>
 <Typography variant="h6" color="inherit">
 INFO3139 - MaterialUI
 </Typography>
 </Toolbar>
 </AppBar>
 <Card style={{ marginTop: "20%" }}>
 <CardHeader title="Exercise #1" style={{ textAlign: "center" }} />
 <CardContent>Cool stuff goes here</CardContent>
 </Card>
 </ThemeProvider>
 );
};
export default MaterialUIEx1Component;