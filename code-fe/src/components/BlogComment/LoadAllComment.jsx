import CardComment from './CardComment';
import { Container } from 'reactstrap';
const LoadAllComment = ({ listComment }) => {
  return (
    <Container>
      {listComment.map((comment) => (
        <CardComment key={comment.id} comment={comment} />
      ))}
    </Container>
  );
};
export default LoadAllComment;
