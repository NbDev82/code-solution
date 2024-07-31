import CardComment from './CardComment';
import { Container } from 'reactstrap';
const LoadAllComment = ({ listComment, reloadComments }) => {
  return (
    <Container style={{ width: 'auto', backgroundColor: '#f2f2f2' }}>
      {listComment.map((comment) => (
        <CardComment key={comment.id} comment={comment} />
      ))}
    </Container>
  );
};
export default LoadAllComment;
