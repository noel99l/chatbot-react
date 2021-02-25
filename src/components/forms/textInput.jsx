import TextField from '@material-ui/core/TextField';
import React from 'react';

const TextInput = (props) => {
    return(
        <TextField 
            fullWidth
            label={props.label}
            margin={"dence"}
            multiline={props.multiline}
            rows={props.rows}
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export default TextInput