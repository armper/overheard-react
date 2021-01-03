import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/shared/reducers/user-management';
import { IPost } from 'app/shared/model/post.model';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { getEntity, updateEntity, createEntity, reset } from './overheard-comment.reducer';
import { IOverheardComment } from 'app/shared/model/overheard-comment.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOverheardCommentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OverheardCommentUpdate = (props: IOverheardCommentUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [postId, setPostId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { overheardCommentEntity, users, posts, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/overheard-comment');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getPosts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);

    if (errors.length === 0) {
      const entity = {
        ...overheardCommentEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="overheardReactApp.overheardComment.home.createOrEditLabel">Create or edit a OverheardComment</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : overheardCommentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="overheard-comment-id">ID</Label>
                  <AvInput id="overheard-comment-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="contentLabel" for="overheard-comment-content">
                  Content
                </Label>
                <AvField
                  id="overheard-comment-content"
                  type="text"
                  name="content"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    minLength: { value: 2, errorMessage: 'This field is required to be at least 2 characters.' },
                    maxLength: { value: 4096, errorMessage: 'This field cannot be longer than 4096 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateLabel" for="overheard-comment-date">
                  Date
                </Label>
                <AvInput
                  id="overheard-comment-date"
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.overheardCommentEntity.date)}
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="rankingLabel" for="overheard-comment-ranking">
                  Ranking
                </Label>
                <AvField id="overheard-comment-ranking" type="string" className="form-control" name="ranking" />
              </AvGroup>
              <AvGroup>
                <Label for="overheard-comment-user">User</Label>
                <AvInput
                  id="overheard-comment-user"
                  type="select"
                  className="form-control"
                  name="user.id"
                  value={isNew ? users[0] && users[0].id : overheardCommentEntity.user?.id}
                  required
                >
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="overheard-comment-post">Post</Label>
                <AvInput
                  id="overheard-comment-post"
                  type="select"
                  className="form-control"
                  name="post.id"
                  value={isNew ? posts[0] && posts[0].id : overheardCommentEntity.post?.id}
                  required
                >
                  {posts
                    ? posts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/overheard-comment" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  posts: storeState.post.entities,
  overheardCommentEntity: storeState.overheardComment.entity,
  loading: storeState.overheardComment.loading,
  updating: storeState.overheardComment.updating,
  updateSuccess: storeState.overheardComment.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getPosts,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OverheardCommentUpdate);
