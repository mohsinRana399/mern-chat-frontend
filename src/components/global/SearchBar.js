import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "5px 5%",
  },
  input: {
    display: "flex",
    flex: 1,
    border: "none",
    fontSize: 16,
    "&:focus": {
      outline: "none",
    },
    color: "#9DAFBD",
    background: "none",
  },
  searchContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingLeft: 20,
    borderRadius: 5,
    border: "1px solid #9DAFBD",
    position: "relative",
    height: 50,
    backgroundColor: "#fff",
  },
}));
const Searchbar = ({ style, searchQuery, setSearchQuery }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container} style={style}>
        <div
          className={classes.searchContainer}
          style={{
            border: "1px solid #9DAFBD",
          }}
        >
          <input
            type="text"
            className={classes.input}
            placeholder={"Search Users"}
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Searchbar;
