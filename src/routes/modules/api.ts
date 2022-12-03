import { Router } from 'express';
import { MatchController, CountryController, LeagueController } from '~/app/controllers';

const router: Router = Router();

// test  api
router.get('/v1/countries', CountryController.countries);
router.get('/v1/leagues', LeagueController.leagues);
// router.get('/v1/menu', route.nenu);

// ok api
router.get('/menu-leagues', LeagueController.leagues);
router.get('/menu/:slug', CountryController.getCountryData);
router.get('/countries', CountryController.countries);
router.get('/matches/soccer/:name/:slug', MatchController.matchesFromMenu);
router.get('/matches/:date', MatchController.matches);
router.get('/match/:id', MatchController.detail);
router.get('/matches', MatchController.matches);

export default router;
