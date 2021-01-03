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
import { ITopic } from 'app/shared/model/topic.model';
import { getEntities as getTopics } from 'app/entities/topic/topic.reducer';
import { getEntity, updateEntity, createEntity, reset } from './post.reducer';
import { IPost } from 'app/shared/model/post.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPostUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PostUpdate = (props: IPostUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [topicId, setTopicId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { postEntity, users, topics, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/post');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getTopics();
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
        ...postEntity,
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
          <h2 id="overheardReactApp.post.home.createOrEditLabel">Create or edit a Post</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : postEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="post-id">ID</Label>
                  <AvInput id="post-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="post-title">
                  Title
                </Label>
                <AvField
                  id="post-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    minLength: { value: 2, errorMessage: 'This field is required to be at least 2 characters.' },
                    maxLength: { value: 80, errorMessage: 'This field cannot be longer than 80 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="post-content">
                  Content
                </Label>
                <AvField
                  id="post-content"
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
                <Label id="dateLabel" for="post-date">
                  Date
                </Label>
                <AvInput
                  id="post-date"
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.postEntity.date)}
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="rankOneLabel" for="post-rankOne">
                  Rank One
                </Label>
                <AvField id="post-rankOne" type="string" className="form-control" name="rankOne" />
              </AvGroup>
              <AvGroup>
                <Label id="rankTwoLabel" for="post-rankTwo">
                  Rank Two
                </Label>
                <AvField id="post-rankTwo" type="string" className="form-control" name="rankTwo" />
              </AvGroup>
              <AvGroup>
                <Label id="rankThreeLabel" for="post-rankThree">
                  Rank Three
                </Label>
                <AvField id="post-rankThree" type="string" className="form-control" name="rankThree" />
              </AvGroup>
              <AvGroup>
                <Label id="rankFourLabel" for="post-rankFour">
                  Rank Four
                </Label>
                <AvField id="post-rankFour" type="string" className="form-control" name="rankFour" />
              </AvGroup>
              <AvGroup>
                <Label id="rankFiveLabel" for="post-rankFive">
                  Rank Five
                </Label>
                <AvField id="post-rankFive" type="string" className="form-control" name="rankFive" />
              </AvGroup>
              <AvGroup>
                <Label id="rankSixLabel" for="post-rankSix">
                  Rank Six
                </Label>
                <AvField id="post-rankSix" type="string" className="form-control" name="rankSix" />
              </AvGroup>
              <AvGroup>
                <Label id="rankSevenLabel" for="post-rankSeven">
                  Rank Seven
                </Label>
                <AvField id="post-rankSeven" type="string" className="form-control" name="rankSeven" />
              </AvGroup>
              <AvGroup>
                <Label for="post-user">User</Label>
                <AvInput
                  id="post-user"
                  type="select"
                  className="form-control"
                  name="user.id"
                  value={isNew ? users[0] && users[0].id : postEntity.user?.id}
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
                <Label for="post-topic">Topic</Label>
                <AvInput
                  id="post-topic"
                  type="select"
                  className="form-control"
                  name="topic.id"
                  value={isNew ? topics[0] && topics[0].id : postEntity.topic?.id}
                  required
                >
                  {topics
                    ? topics.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/post" replace color="info">
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
  topics: storeState.topic.entities,
  postEntity: storeState.post.entity,
  loading: storeState.post.loading,
  updating: storeState.post.updating,
  updateSuccess: storeState.post.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getTopics,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostUpdate);
