import { useEffect, useRef, useState } from "react";

const PieChart = (props) => {
  const percent = props.percent;
  const duration = props.duration;
  const language = props.language;
  const circleRef = useRef(null);
  const areaRef = useRef(null);
  const [minLenght, setMinLenght] = useState(0);
  let rebuildTime = 0;

  const clearCanvas = (ctx) => {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
  };

  const drawBaisceCircle = (ctx) => {
    circleRef.current.height = minLenght;
    circleRef.current.width = minLenght;
    ctx.beginPath();
    const r = minLenght / 2;
    ctx.arc(r, r, r - 10, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#C0C0C0";
    ctx.stroke();
  };

  const drawPercent = (ctx) => {
    clearCanvas(ctx);
    drawBaisceCircle(ctx);
    const current = Date.now();
    let currentPercent = ((current - rebuildTime) / duration) * percent;
    currentPercent = currentPercent > percent ? percent : currentPercent;
    const r = minLenght / 2;
    ctx.beginPath();
    ctx.arc(
      r,
      r,
      r - 10,
      Math.PI * 1.5,
      Math.PI * 1.5 + (2 * Math.PI * currentPercent) / 100,
      false
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#808000";
    ctx.stroke();
    ctx.font = `${r}px serif`;
    ctx.fillText(
      parseInt(currentPercent, 10),
      (minLenght - r) / 2,
      (minLenght + r) / 2
    );
    if (rebuildTime + duration >= current)
      window.requestAnimationFrame((timestemp) => drawPercent(ctx));
  };

  const onScroll = (e) => {
    const currentScreenCenterY =
      document.documentElement.scrollTop + window.innerHeight / 2;
    if (Math.abs(currentScreenCenterY - minLenght) >= window.innerHeight / 2) {
      reDraw(circleRef.current.getContext("2d"));
    }
  };

  const reDraw = (ctx) => {
    if (minLenght == 0) return;
    const currentTime = Date.now();
    if (rebuildTime + 1000 < currentTime) {
      rebuildTime = currentTime;
      drawPercent(ctx);
    }
  };
  useEffect(() => {
    const reFreshLength = () => {
      const m = Math.min(
        areaRef.current.clientWidth,
        areaRef.current.clientHeight
      );
      if (m != minLenght) {
        setMinLenght(m);
      }
    };

    window.addEventListener("resize", reFreshLength);
    window.addEventListener("scroll", onScroll);
    reFreshLength();
    reDraw(circleRef.current.getContext("2d"));
    return () => {
      window.removeEventListener("resize", reFreshLength);
      window.removeEventListener("scroll", onScroll);
    };
  }, [minLenght]);

  return (
    <div className="flex items-center justify-center flex-col">
      {language}
      <div
        ref={areaRef}
        className="h-full w-full items-center justify-center flex"
      >
        <canvas height={minLenght} width={minLenght} ref={circleRef} />
      </div>
    </div>
  );
};

export default PieChart;
