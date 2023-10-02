import { Router } from 'express';

import * as controller from './controller.js';
import { auth } from '../auth.js';
// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});
/**
 * /api/v1/lessonevents       GET    -  READ ALL OR BY LESSON EVENTS
 * /api/v1/lessonevents       POST   -  Create a lesson event
 * /api/v1/lessonevents/:id   GET    -  Read one lesson event by its id
 */
router.route('/').get(controller.allEvents).post(auth, controller.createEvent);

router.param('id', controller.idEvent);

router.route('/:id').get(controller.readEvent);
