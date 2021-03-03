import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { CTX } from "./Store";
import { grey } from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    spacing: (2),
    margin: '5px',
    padding: theme.spacing(2),
  },
    media: {
        height: "flex",
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
      },
      border: {
        border: 'solid',
      },
      fullHeightCard: {
        height: '100%',
      },
      card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
      },
      overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
      },
      overlay2: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
      },
      grid: {
        display: 'flex',
      },
      details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
      },
      title: {
        padding: '0 16px',
      },
      cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
      
  },
  grow: {
    flexGrow: "1",
  },
  textCenter: {
    textAlign: "center",
  },
  chatHeader: {
    flexGrow: "1",

    margin: '5px',
    padding: theme.spacing(2),
    backgroundColor: "darkgrey",
    color: "#FFF",
    textAlign: "center",
  },
  topicsWindow: {
    width: "15%",
    margin: '5px',
    padding: theme.spacing(2),
    backgroundColor: "darkgrey",
    height: "calc(100vh - 122px)",
    maxHeight: "100%",
    color: "#FFF",
    display: "inline-flex",
    float: "left",
    flexDirection: "column",
  },
  chatWindow: {
    height: "calc(100vh - 222px)",
    borderRadius: 0,
    overflowY: "auto",
  },
  chatWindowContent: {
    backgroundColor: "lightgrey",
    margin: '5px',
    padding: theme.spacing(2),
  },
  footer: {
    padding: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
  },
  flex: {
    display: "flex",
  },
  alignCenter: {
    alignItems: "center",
  },
  spacing: {
    marginRight: "20px",
  },
  topicSelector: {
      alignItems: "left",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { allChats, sendChatMsg, user } = React.useContext(CTX);
  const topics = Object.keys(allChats);

  const [value, setValue] = useState("");

  const [activeTopic, setActiveTopic] = useState(topics[0]);
  return (
    <Card className={classes.card}>
      <div className={classes.root}>
        <div className={classes.chatHeader}>
          <h1>QuestBOARD CHAT</h1>
          <h3>{activeTopic}</h3>
        </div>
      </div>
      <div className={classes.topicsWindow}>
        {topics.map((topic, idx) => {
          return (
            <List component="nav" key={idx}>
              <ListItem className={classes.topicSelector}
                button
                onClick={(e) => setActiveTopic(e.target.innerText)}
              >
                <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
                <ListItemText primary={topic} />
              </ListItem>
            </List>
          );
        })}
      </div>
      <span></span>
      <div className={classes.chatWindowContainer}>
        <Card className={classes.chatWindow} variant="outlined">
          {allChats[activeTopic].map((msg, idx) => {
            return (
              <CardContent
                key={idx}
                className={`${classes.flex} ${classes.chatWindowContent} ${classes.alignCenter}`}
              >
                <Avatar
                  alt={msg.from}
                  src="dummy.jpg"
                  className={classes.spacing}
                />
                <Typography>{msg.msg}</Typography>
              </CardContent>
            );
          })}
        </Card>
        <Card className={classes.footer}>
          <TextField
            className={classes.grow}
            id="standard-basic"
            label="Type here ..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={() => {
              sendChatMsg({ from: user, msg: value, topic: activeTopic });
              setValue("");
            }}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </Card>
      </div>
    </Card>
  );
}