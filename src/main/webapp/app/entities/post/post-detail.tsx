import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './post.reducer';
import { IPost } from 'app/shared/model/post.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPostDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PostDetail = (props: IPostDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { postEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Post [<b>{postEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{postEntity.title}</dd>
          <dt>
            <span id="content">Content</span>
          </dt>
          <dd>{postEntity.content}</dd>
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>{postEntity.date ? <TextFormat value={postEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="rankOne">Rank One</span>
          </dt>
          <dd>{postEntity.rankOne}</dd>
          <dt>
            <span id="rankTwo">Rank Two</span>
          </dt>
          <dd>{postEntity.rankTwo}</dd>
          <dt>
            <span id="rankThree">Rank Three</span>
          </dt>
          <dd>{postEntity.rankThree}</dd>
          <dt>
            <span id="rankFour">Rank Four</span>
          </dt>
          <dd>{postEntity.rankFour}</dd>
          <dt>
            <span id="rankFive">Rank Five</span>
          </dt>
          <dd>{postEntity.rankFive}</dd>
          <dt>
            <span id="rankSix">Rank Six</span>
          </dt>
          <dd>{postEntity.rankSix}</dd>
          <dt>
            <span id="rankSeven">Rank Seven</span>
          </dt>
          <dd>{postEntity.rankSeven}</dd>
          <dt>User</dt>
          <dd>{postEntity.user ? postEntity.user.id : ''}</dd>
          <dt>Topic</dt>
          <dd>{postEntity.topic ? postEntity.topic.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/post" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/post/${postEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ post }: IRootState) => ({
  postEntity: post.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
