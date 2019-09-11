import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { socket } from "../../../server_api";
import { FriendContext } from "../../../Context";
import SingleFriendList from "./SingleChat";
import GroupFriendList from "./GroupChat";
import "./CreateChat.scss";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  }
}));

const CreateChat = () => {
  const [show, setShow] = useState(false);
  const [groupShow, setGroupShow] = useState(false);

  const handleSubmit = () => {
    setShow(true);
  };

  const groupSubmit = () => {
    setShow(true);
    setGroupShow(true);
  };

  const classes = useStyles();

  return (
    <>
      {show ? (
        groupShow ? (
          <div>
            <GroupFriendList />
          </div>
        ) : (
          <div>
            <SingleFriendList />
          </div>
        )
      ) : (
        <div className="addContainer">
          <Button onClick={handleSubmit}>+ Single Chat</Button>
          <Button onClick={groupSubmit}>+ Group Chat</Button>
        </div>
      )}
    </>
  );
};

export default CreateChat;
