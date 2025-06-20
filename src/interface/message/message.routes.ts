import { Router } from 'express';

const router = Router();

router.get('/users');

router.get('/:id');

router.get('/send/:id');