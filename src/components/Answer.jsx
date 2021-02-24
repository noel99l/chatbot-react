import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        
    }
}))

const Answer = (props) => {
    // const classes = useStyles()
    return(
        <Button variant="contained">
            {props.content}
        </Button>
    )
}

export default Answer