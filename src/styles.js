import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    backgroundImage:
      "linear-gradient(320deg, rgba(2,0,36,1) 0%, rgba(61,69,77,1) 100%)",
    margin: 0,
    position: "absolute",
    padding: 0,
    height: "100%",
    minHeight: 980,
    minWidth: "100%",
    top: 0,
    left: 0
  },
  title: {
    color: "white",
    marginBottom: 55
  },
  appContainer: {
    marginTop: "8%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  modalButton: {
    padding: 15
  },
  modalButtonContainer: {
    marginTop: 20
  },
  buttonWrapper: {
    marginTop: 20
  },
  unlockButton: {
    width: 430,
    height: 50,
    backgroundColor: "#bb01b8",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#bb01b8"
    }
  },
  mainButtonContainer: {
    marginTop: 28
  }
});

export default useStyles;
