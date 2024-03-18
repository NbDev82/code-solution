import { useState, memo, useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import './Topicbar.scss';
import Button from '~/components/Buttons/Button';
import {limitTopics} from '~/Const'

function Topicbar({ topics, onFillterProblem }) {
  const [sliceStartPoint, setSliceStartPoint] = useState(0);
  const [sliceEndPoint, setSliceEndPoint] = useState(limitTopics);
  const [topicCurrent, setTopicCurrent] = useState([]);

  useEffect(() => {
    setTopicCurrent((prev) => topics.slice(sliceStartPoint, sliceEndPoint));
  }, []);

  const handleShowNextTopic = () => {
    let start = sliceEndPoint;
    let end = sliceEndPoint;
    start = end;
    end = end + limitTopics;
    setTopicCurrent((prev) => topics.slice(start, end));

    if (sliceEndPoint >= topics.length) {
      start = 0;
      end = limitTopics;
    }

    setSliceStartPoint((prev) => start);
    setSliceEndPoint((prev) => end);
  };

  return (
    <div className="topicbar">
      <Button id="all" dark small onClick={onFillterProblem}>
        All Topic
      </Button>
      <div className="topicbar__list">
        {topicCurrent.map((topic, index) => (
          <Button key={topic.id} id={topic.id} textHighLight small badge={topic.quantity} onClick={onFillterProblem}>
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
