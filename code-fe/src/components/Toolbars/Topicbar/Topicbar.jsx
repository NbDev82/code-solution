import { useState, memo, useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import './Topicbar.scss';
import Button from '~/components/Buttons/Button';

function Topicbar({ topics, onFillterProblem }) {
  let limit = 4;
  const [sliceStartPoint, setSliceStartPoint] = useState(0);
  const [sliceEndPoint, setSliceEndPoint] = useState(limit);
  const [topicCurrent, setTopicCurrent] = useState([]);

  useEffect(() => {
    setTopicCurrent((prev) => topics.slice(sliceStartPoint, sliceEndPoint));
  }, [topics]);

  const handleShowNextTopic = () => {
    console.log('click');
    let start = sliceEndPoint;
    let end = sliceEndPoint;
    start = end;
    end = end + limit;
    setTopicCurrent((prev) => topics.slice(start, end));

    if (sliceEndPoint >= topics.length) {
      start = 0;
      end = limit;
    }

    setSliceStartPoint((prev) => start);
    setSliceEndPoint((prev) => end);
  };

  return (
    <div className="topicbar">
      <Button id="All" dark small onClick={onFillterProblem}>
        All Topic
      </Button>
      <div className="topicbar__list">
        {topicCurrent.map((topic, index) => (
          <Button key={index} id={topic.title} textHighLight small badge={topic.quantity} onClick={onFillterProblem}>
            {topic.title}
          </Button>
        ))}
      </div>
      <Button icon small onClick={handleShowNextTopic}>
        <NavigateNextIcon sx={{ fontSize: 24 }} />
      </Button>
    </div>
  );
}

export default memo(Topicbar);
