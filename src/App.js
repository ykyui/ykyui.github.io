import "./App.css";
import Header from "./layout/Header";
import React, { useEffect } from "react";
import Intro from "./page/Intro";
import styled from "styled-components";
import SkillSet from "./page/Skill-set";
import Work from "./page/Work";
import Toys from "./page/Toys";
import Content from "./page/Content";
import {
  Accessibility,
  Info as InfoIcon,
  Work as WorkIcon,
  Toys as ToysIcon,
  ContactPage,
} from "@mui/icons-material";

const StyledContent = styled.div`
  section {
    height: 100vh;
    max-height: 1024px;
    padding-top: 60px;
    // padding-bottom:15%;
  }
`;

const StyledHeader = styled.i`
  display: flex;
  alignitems: center;
  flexwrap: wrap;
  cursor: pointer;
`;

function App() {
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
          return null;
        },
      })
    );
  } catch (e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  // call this to Disable
  function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  useEffect(() => {
    disableScroll();
    return () => enableScroll();
  }, []);

  return (
    <>
      <Header
        section={[
          <StyledHeader>
            <Accessibility fontSize="medium" />
            <div className="hidden sm:flex"> intro</div>
          </StyledHeader>,
          <StyledHeader>
            <WorkIcon />{" "}
            <div className="hidden sm:flex">working experience</div>
          </StyledHeader>,
          <StyledHeader>
            <InfoIcon /> <div className="hidden sm:flex">about</div>
          </StyledHeader>,
          // <i>
          //   <ToysIcon /> <div className="hidden sm:flex">toys</div>
          // </i>,
          <StyledHeader>
            <ContactPage /> <div className="hidden sm:flex">contact</div>
          </StyledHeader>,
        ]}
      />
      <StyledContent>
        <Intro />
        <Work />
        <SkillSet />
        {/* <Toys /> */}
        <Content />
      </StyledContent>
    </>
  );
}

export default App;
