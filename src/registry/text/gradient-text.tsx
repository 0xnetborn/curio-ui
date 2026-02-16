


export default function GradientText({
  children,
  className = '',
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  animationSpeed = 8,
  showBorder = false
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`
  };

  return (
    <div 
      className={`animated-gradient-text ${className}`}
      role="text"
      aria-label={`Animated gradient text: ${children}`}
    >
      {showBorder && <div className="gradient-overlay" style={gradientStyle} aria-hidden="true"></div>}
      <div className="text-content" style={gradientStyle}>
        {children}
      </div>
    </div>
  );
}

