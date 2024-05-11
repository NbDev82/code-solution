import { useState, memo, useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PropTypes from 'prop-types';
import './Topicbar.scss';
import Button from '~/components/Buttons/Button';
import { LIMIT_QUANTITY_TOPICS } from '~/utils/Const';
import { normalizeName } from '~/utils/string';
Topicbar.propTypes = {
  topics: PropTypes.array,
  onFilterTopics: PropTypes.func,
};
Topicbar.defaultProps = {
  topics: [],
};

function Topicbar(props) {
  const [sliceStartPoint, setSliceStartPoint] = useState(0);
  const [sliceEndPoint, setSliceEndPoint] = useState(LIMIT_QUANTITY_TOPICS);
  const [topicCurrent, setTopicCurrent] = useState([]);

  useEffect(() => {
    setTopicCurrent(props.topics.slice(sliceStartPoint, sliceEndPoint));
  }, [props.topics]);

  const handleShowNextTopic = () => {
    let end = sliceEndPoint;
    let start = end;
    end = end + LIMIT_QUANTITY_TOPICS;

    setTopicCurrent(props.topics.slice(start, end));
    console.log(topicCurrent);
    if (end >= props.topics.length) {
      start = 0;
      end = LIMIT_QUANTITY_TOPICS;
    }

    setSliceStartPoint(start);
    setSliceEndPoint(end);
  };

  return (
    <div className="topicbar">
      <Button id="ALL" dark small onClick={props.onFilterTopics}>
        All Topic
      </Button>
      <div className="topicbar__list">
        {topicCurrent.map((topic, index) => (
          <Button key={index} id={topic.name} textHighLight small badge={topic.quantity} onClick={props.onFilterTopics}>
            {normalizeName(topic.name)}
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
