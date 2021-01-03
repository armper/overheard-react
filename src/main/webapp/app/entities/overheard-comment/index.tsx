import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OverheardComment from './overheard-comment';
import OverheardCommentDetail from './overheard-comment-detail';
import OverheardCommentUpdate from './overheard-comment-update';
import OverheardCommentDeleteDialog from './overheard-comment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OverheardCommentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OverheardCommentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OverheardCommentDetail} />
      <ErrorBoundaryRoute path={match.url} component={OverheardComment} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OverheardCommentDeleteDialog} />
  </>
);

export default Routes;
