import React from 'react';
import '../App.css';
// An example of a React Functional Component using createElement
const FunctionalNonJSX = ({ somedata }) => {
 // es6 way of doing props.somedata
 if (!somedata) {
 return React.createElement('div');
 }
 return React.createElement('div', { className: 'bigred' }, somedata);
};
export default FunctionalNonJSX;