import express from 'express';
import mock from '../../data/mock/mock';

const router = express.Router();

router.get('/', (request, response) => {
  response.send(mock.messages);
});


export default router;
