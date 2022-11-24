import { Router } from 'express';
import { CrawlController as route } from '~/app/controllers';

const router: Router = Router();

router.get('/matches', route.matches);

export default router;
