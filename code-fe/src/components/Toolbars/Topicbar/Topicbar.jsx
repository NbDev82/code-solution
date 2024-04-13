import { useState, memo } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import './Topicbar.scss';
import Button from '~/components/Buttons/Button';
import { LIMIT_QUANTITY_TOPICS } from '~/utils/Const';

function Topicbar({ topics, onFilterTopics }) {
  const [sliceStartPoint, setSliceStartPoint] = useState(0);
  const [sliceEndPoint, setSliceEndPoint] = useState(LIMIT_QUANTITY_TOPICS);
  const [topicCurrent, setTopicCurrent] = useState(() => {
    return topics.slice(sliceStartPoint, sliceEndPoint);
  });

  const handleShowNextTopic = () => {
    let start = sliceEndPoint;
    let end = sliceEndPoint;
    start = end;
    end = end + LIMIT_QUANTITY_TOPICS;
    setTopicCurrent(topics.slice(start, end));

    if (sliceEndPoint >= topics.length) {
      start = 0;
      end = LIMIT_QUANTITY_TOPICS;
    }

    setSliceStartPoint(start);
    setSliceEndPoint(end);
  };

  return (
    <div className="topicbar">
      <Button id="all" dark small onClick={onFilterTopics}>
        All Topic
      </Button>
      <div className="topicbar__list">
        {topicCurrent.map((topic) => (
          <Button key={topic.id} id={topic.id} textHighLight small badge={topic.quantity} onClick={onFilterTopics}>
            {topic.name}
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
