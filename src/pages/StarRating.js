const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const remainingStars = Math.floor(5 - rating);
  const decimalPart = rating - filledStars;

  const filledStarArray = [];
  for (let i = 0; i < filledStars; i++) {
    filledStarArray.push(<Star key={i} filled />);
  }

  const remainingStarArray = [];
  for (let i = 0; i < remainingStars; i++) {
    remainingStarArray.push(<Star key={i + filledStars} />);
  }

  return (
    <div className="flex">
      {filledStarArray}

      {decimalPart > 0 && decimalPart < 1 && (
        <Star key="partial" partialFilled decimalPart={decimalPart} />
      )}

      {remainingStarArray}
    </div>
  );
};

const Star = ({ filled, partialFilled, decimalPart }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    className="w-5 h-5 mx-[2px]"
  >
    {partialFilled ? (
      <defs>
        <linearGradient id={`gradient-${decimalPart}`}>
          <stop offset={decimalPart * 100 + "%"} stopColor="#FFD700" />
          <stop offset={decimalPart * 100 + "%"} stopColor="transparent" />
        </linearGradient>
      </defs>
    ) : null}
    <polygon
      points="10 1 12.4 6.8 18 7.6 14 12 15.6 18 10 14.8 4.4 18 6 12 1 7.6 6.8 6 12"
      fill={
        partialFilled
          ? `url(#gradient-${decimalPart})`
          : filled
          ? "#FFD700"
          : "none"
      }
      stroke="#FFD700"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default StarRating;
