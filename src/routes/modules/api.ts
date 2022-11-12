import { Router } from 'express';
import { ApiController as route } from '~/app/controllers';

const router: Router = Router();

router.get('/v1/countries', route.countries);
// router.get('/test', route.test);
// router.get('/test2', route.test2);

export default router;
