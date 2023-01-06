import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionContainer = ({ titleIcon, title, details }) => {
  return (
    <Accordion
      sx={{
        p: 0,
        margin: "10px 0px",
        borderTop: "none",
      }}
      elevation={0}
      defaultExpanded
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ p: 0, display: "flex", alignItems: "center" }}
      >
        {titleIcon}
        <p
          style={{
            fontSize: 16,
            fontWeight: "bold",
            margin: 0,
            color: "#000",
            marginLeft: 20,
            textAlign: "center",
          }}
        >
          {title}
        </p>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>{details}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionContainer;
