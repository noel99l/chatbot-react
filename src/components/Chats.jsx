import List from '@material-ui/core/List';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Chat } from './index';



const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
        },
        inline: {
        display: 'inline',
        },
    }),
);


const Chats = (props) => {
    const classes = useStyles()
    return(
        <List className={classes.root}>
            {props.chats.map((chat, index) => {
                return <Chat text={chat.text} type={chat.type} key={index.toString()}/>
            })}
        </List>
    )
}

export default Chats