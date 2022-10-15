import { Router } from 'express';
import { ApiController as route } from '~/app/controllers';

const router = Router();

router.get('/v1', route.index);

export default router;
