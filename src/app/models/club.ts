import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Club extends Model {
  declare club_id: number;
  declare club_country: string;
  declare id_province: number;
  declare id_stage: number;
}

Club.init({});

export default new Club();
