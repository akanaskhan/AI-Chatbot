export default function BackgroundOverlay() {
  return (
    <>
      <div className="absolute bottom-0 -z-50">
        <div className="ball-container">
          <div className="blurred-ball ball1"></div>
          <div className="blurred-ball ball2"></div>
          <div className="blurred-ball ball3"></div>
        </div>
      </div>
    </>
  );
}
