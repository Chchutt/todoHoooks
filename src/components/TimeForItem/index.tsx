import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import React, { useEffect, useState } from 'react';

export function CreatingTimeForTask(date: Date) {
  const [time, setTime] = useState(`created ${formatDistanceToNowStrict(date)} ago`);

  useEffect(() => {
    setInterval(() => {
      setTime(`created ${formatDistanceToNowStrict(date)} ago`);
    }, 1000);
  }, []);
  return <span className="created">{time}</span>;
}
