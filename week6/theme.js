import { createTheme } from "@mui/material/styles";
export default createTheme({
 typography: {
 useNextVariants: true,
 },
 palette: {"palette":{"common":{"black":"#000","white":"#fff"},"background":{"paper":"rgba(5, 142, 208, 1)","default":"rgba(26, 194, 230, 1)"},"primary":{"light":"#7986cb","main":"#3f51b5","dark":"#303f9f","contrastText":"#fff"},"secondary":{"light":"rgba(237, 153, 72, 1)","main":"rgba(245, 120, 0, 1)","dark":"rgba(199, 97, 0, 1)","contrastText":"#fff"},"error":{"light":"#e57373","main":"#f44336","dark":"#d32f2f","contrastText":"#fff"},"text":{"primary":"rgba(0, 0, 0, 0.87)","secondary":"rgba(0, 0, 0, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","hint":"rgba(0, 0, 0, 0.38)"}}}
});
