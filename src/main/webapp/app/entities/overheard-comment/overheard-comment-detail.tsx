import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './overheard-comment.reducer';
import { IOverheardComment } from 'app/shared/model/overheard-comment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOverheardCommentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OverheardCommentDetail = (props: IOverheardCommentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { overheardCommentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          OverheardComment [<b>{overheardCommentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="content">Content</span>
          </dt>
          <dd>{overheardCommentEntity.content}</dd>
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>
            {overheardCommentEntity.date ? <TextFormat value={overheardCommentEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="ranking">Ranking</span>
          </dt>
          <dd>{overheardCommentEntity.ranking}</dd>
          <dt>User</dt>
          <dd>{overheardCommentEntity.user ? overheardCommentEntity.user.id : ''}</dd>
          <dt>Post</dt>
          <dd>{overheardCommentEntity.post ? overheardCommentEntity.post.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/overheard-comment" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/overheard-comment/${overheardCommentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ overheardComment }: IRootState) => ({
  overheardCommentEntity: overheardComment.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OverheardCommentDetail);
