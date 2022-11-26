import { Router } from 'express';
import { CrawlController as route } from '~/app/controllers';

const router: Router = Router();

router.get('/matches', route.matches);
router.get('/v1/:id', route.detail);

export default router;
