import React, { useState, useEffect } from "react";

const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(calculateTimeAgo(timestamp));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
