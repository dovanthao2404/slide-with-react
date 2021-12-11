import { isMobile } from "react-device-detect";
import "./App.scss";
import { useEffect, useRef, useState } from "react";
import artComplexLayout02 from "./assets/images/mo-complex-layout-01-2@2x.png";
import artComplexLayout03 from "./assets/images/mo-complex-layout-01-3@2x.png";
import artComplexLayout04 from "./assets/images/mo-complex-layout-01-4@2x.png";
import artComplexLayout05 from "./assets/images/mo-complex-layout-01-5@2x.png";

function App() {
  // useRef
  const slideRef = useRef(null);
  const [infoSlide, setInfoSlide] = useState({
    isDrag: false, // Drag for animation
    startX: 0, // Start X position cursor
    currentSlide: 0, // Current slide
    slideWidth: 0, // Width of slide (all item + column gap)
    itemWidth: 0, // Width of item (not about column gap)
    offsetWidth: 0, // Width slide offset
    widthDrag: 0, // Width of drag for move
    totalSlide: 0, // Total slide
    percentItemEnd: 0, // Percent of item end
  });

  useEffect(() => {
    if (slideRef.current) {
      const columnGap = 15;
      const containerPadding = 21;
      const itemWidth = slideRef.current.children[0].offsetWidth;
      const offsetWidth = slideRef.current.offsetWidth;
      const widthItemVisible = offsetWidth - itemWidth - columnGap;
      const widthItemHidden = itemWidth - widthItemVisible;
      setInfoSlide({
        ...infoSlide,
        slideWidth:
          (slideRef.current.children[0].offsetWidth + 15) *
          [...slideRef.current.children].length,
        itemWidth,
        totalSlide: [...slideRef.current.children].length,
        offsetWidth,
        percentItemEnd:
          (widthItemHidden + containerPadding) /
          (itemWidth + columnGap).toFixed(2),
      });
    }
  }, []);
  const onTouchStart = (e) => {
    setInfoSlide({
      ...infoSlide,
      isDrag: true,
      startX: e.touches[0].clientX,
    });
  };

  const onTouchMove = (e) => {
    if (infoSlide.isDrag) {
      setInfoSlide({
        ...infoSlide,
        widthDrag: e.changedTouches[0].clientX - infoSlide.startX,
      });
    }
  };
  const onTouchEnd = (e) => {
    if (infoSlide.isDrag) {
      const widthClientX = e.changedTouches[0].clientX - infoSlide.startX;
      if (widthClientX !== 0) {
        let currentSlide =
          widthClientX > 0
            ? infoSlide.currentSlide + 1
            : infoSlide.currentSlide - 1;
        if (Math.abs(infoSlide.currentSlide) === infoSlide.totalSlide - 2) {
          console.log(infoSlide.percentItemEnd);
          currentSlide = currentSlide + (1 - infoSlide.percentItemEnd);
        }
        if (
          Math.abs(infoSlide.currentSlide) < 1 &&
          Math.abs(infoSlide.currentSlide) % 1 !== 0
        ) {
          if (widthClientX > 0) {
            currentSlide = 0;
          }
        }
        currentSlide =
          widthClientX > 0 && infoSlide.currentSlide === 0 ? 0 : currentSlide;
        if (Math.abs(infoSlide.currentSlide) !== infoSlide.totalSlide - 2) {
          currentSlide =
            widthClientX < 0 &&
            Math.abs(Math.ceil(infoSlide.currentSlide)) ===
              infoSlide.totalSlide - 2
              ? infoSlide.currentSlide
              : currentSlide;
        }

        setInfoSlide({
          ...infoSlide,
          isDrag: false,
          currentSlide,
          widthDrag: 0,
        });
      }
    }
  };
  return isMobile ? (
    <div className="layout">
      <div className="layout-slide">
        <div
          style={{ paddingLeft: "1.3125rem" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          <div
            ref={slideRef}
            className="layout-slide-wrapper"
            style={{
              transform: `translate3d(${
                infoSlide.currentSlide * (infoSlide.itemWidth + 15) +
                infoSlide.widthDrag
              }px,0,0)`,
              transitionDuration: `${infoSlide.isDrag ? "0s" : "0.3s"}`,
            }}
          >
            <div className="layout-slide-item">
              <div className="layout-slide-item-title">잔디 광장</div>
              <img
                className="layout-slide-item-img"
                srcSet={artComplexLayout02}
                alt="artComplexLayout02"
              />
            </div>

            <div className="layout-slide-item">
              <div className="layout-slide-item-title">어린이 놀이터</div>
              <img
                className="layout-slide-item-img"
                srcSet={artComplexLayout03}
                alt="artComplexLayout03"
              />
            </div>
            <div className="layout-slide-item">
              <div className="layout-slide-item-title">주민운동시설</div>
              <img
                className="layout-slide-item-img"
                srcSet={artComplexLayout04}
                alt="artComplexLayout04"
              />
            </div>
            <div className="layout-slide-item">
              <div className="layout-slide-item-title">휴게공간</div>
              <img
                className="layout-slide-item-img"
                srcSet={artComplexLayout05}
                alt="artComplexLayout05"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default App;
