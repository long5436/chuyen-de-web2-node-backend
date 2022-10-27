import { Router } from 'express';
import { WebController as route } from '~/app/controllers';

const router: Router = Router();

router.get('/login', route.login);
router.get('/', route.index);

export default router;