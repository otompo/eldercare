const PageLoader = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        background: '#33195A',
        color: 'white',
        top: 0,
        left: 0,
        zIndex: 999,
        height: '30vh',
      }}
    >
      <svg width="205" height="250" viewBox="0 0 40 50">
        <polygon
          strokeWidth="1"
          stroke="#FFFFFF"
          fill="none"
          points="20,1 40,40 1,40"
        ></polygon>
        <text fill="#FFFFFF" x="5" y="47">
          Loading...
        </text>
      </svg>
    </div>
  );
};

export default PageLoader;
