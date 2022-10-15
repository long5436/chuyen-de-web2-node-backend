import { Router } from 'express';
import { WebController as route } from '~/app/controllers';

const router = Router();

router.get('/', route.index);

export default router;
