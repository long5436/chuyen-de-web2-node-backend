import { Router } from 'express';
import { ApiController as route } from '~/app/controllers';

const router: Router = Router();

router.get('/v1/countries', route.countries);
router.get('/v1/leagues', route.leagues);
router.get('/v1/seasons', route.season);
router.get('/v1/topscorers', route.topscore);
router.get('/v1/player', route.player);

// router.get('/test2', route.test2);

router.get('/all/countries', route.getAllCountries);
router.get('/matches/today', route.matchToday);
router.get('/topscorers', route.matchToday);
router.get('/seasons', route.season);
router.get('/player', route.player);

export default router;
