import React, { useState, useEffect } from "react";
import styledComponents from "styled-components";

const TitleButton = styledComponents.div`
color: ${(props) => (props.selected ? "olive;" : "black")}
`;

function Header(params) {
  const [pageIndex, setPageIndex] = useState(0);
  let scrollTS = Date.now();
  let startY = 0;

  const moveUpOrDown = (delta) => {
    if (delta === 0) return;
    if (Date.now() - scrollTS < 400) {
      scrollTS = Date.now();
      return;
    }
    const upOrDown = delta < 0 ? 1 : -1;
    if (
      pageIndex + upOrDown >= 0 &&
      pageIndex + upOrDown < document.getElementsByTagName("section").length
    ) {
      scrollTo(pageIndex + upOrDown);
    }
  };
  const scrollTo = (index) => {
    document.getElementsByTagName("section")[index].scrollIntoView({
      behavior: "smooth",
    });
    setPageIndex(index);
  };
  const scrollListen = (e) => {
    moveUpOrDown(e.wheelDelta);
  };
  const touchStart = (e) => {
    startY = e.changedTouches[0].screenY;
  };
  const touchend = (e) => {
    if (Math.abs(e.changedTouches[0].screenY - startY) > 50)
      moveUpOrDown(startY < e.changedTouches[0].screenY ? 1 : -1);
  };
  const resize = () => {
    document.getElementsByTagName("section")[pageIndex].scrollIntoView();
  };
  useEffect(() => {
    document.addEventListener("wheel", scrollListen);
    document.addEventListener("touchstart", touchStart);
    document.addEventListener("touchend", touchend);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("wheel", scrollListen);
      document.removeEventListener("touchstart", touchStart);
      document.removeEventListener("touchend", touchend);
      window.removeEventListener("resize", resize);
    };
  });

  useEffect(() => {
    for (
      let index = 0;
      index < document.getElementsByTagName("section").length;
      index++
    ) {
      const section = document.getElementsByTagName("section")[index];
      if (section.offsetTop >= document.documentElement.scrollTop) {
        scrollTo(index);
        break;
      }
    }
  }, []);

  return (
    <header className="fixed p-8 w-screen opacity-80">
      <nav>
        <div className="space-x-8 sm:space-x-20 flex justify-end">
          {params.section.map((e, index) => (
            <TitleButton
              selected={pageIndex === index}
              key={index}
              onClick={() => {
                scrollTo(index);
              }}
            >
              {e}
            </TitleButton>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
