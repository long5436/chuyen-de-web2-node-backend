import { Router } from 'express';
import { ApiController as route } from '~/app/controllers';

const router: Router = Router();

router.get('/v1/countries', route.countries);
router.get('/v1/leagues', route.leagues);
// router.get('/test2', route.test2);

router.get('/all/countries', route.getAllCountries);
router.get('/matches/today', route.matchToday);

export default router;
