import React from 'react'
import classes from '../Backdrop/Backdrop.module.css'

const Backdrop = props => <div className={classes.Backdrop} onClick={props.onClick}></div>


export default Backdrop