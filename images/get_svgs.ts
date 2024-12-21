import Air_Condition from "./air_condition.svg";
import Babysitter from "./babysitter.svg";
import Bathroom from "./bathrooms.svg";
import BBQ_Grill from "./bbq_grill.svg";
import Bedroom from "./bedrooms.svg";
import BedLinens from "./bed_linens.svg";
import Chair from "./chair.svg";
import Clothings from "./clothings.svg";
import CoffeeMaker from "./coffee_maker.svg";
import Dishes from "./dishes_silverware.svg";
import Dogs from "./dogs.svg";
import Essentials from "./essentials.svg";
import FireExtinguisher from "./fire_extinguisher.svg";
import Free_Parking from "./free_parking.svg";
import Gym from "./gym.svg";
import HairDryer from "./hair_dryer.svg";
import Kitchen from "./kitchen.svg";
import Laptop from "./laptop.svg";
import Oven from "./oven.svg";
import PrivateEntrance from "./private_entrance.svg";
import Refrigerator from "./refrigerator.svg";
import Shampoo from "./shampoo.svg";
import Stove from "./stove.svg";
import Swimming_Pool from "./swimming_pool.svg";
import Toilet from "./toilet.svg";
import TV from "./tv.svg";
import Washer from "./washer.svg";
import Wifi from "./wifi.svg";

import { AmenitiesEnum } from "./type";

export default function get_svg(icon: AmenitiesEnum) {
  switch (icon) {
    case AmenitiesEnum.ACCESSIBLE_HEIGHT_BED:
    case AmenitiesEnum.BED_LINENS:
    case AmenitiesEnum.FIRM_MATTRESS:
    case AmenitiesEnum.EXTRA_PILLOWS_AND_BLANKETS:
      return BedLinens;
    case AmenitiesEnum.ACCESSIBLE_HEIGHT_TOILET:
      return Toilet;
    case AmenitiesEnum.AIR_CONDITIONING:
    case AmenitiesEnum.CARBON_MONOXIDE_DETECTOR:
    case AmenitiesEnum.EV_CHARGER:
    case AmenitiesEnum.HEATING:
    case AmenitiesEnum.OUTLET_COVERS:
    case AmenitiesEnum.SMOKE_DETECTOR:
      return Air_Condition;
    case AmenitiesEnum.BABYSITTER_RECOMMENDATIONS:
    case AmenitiesEnum.BABY_MONITOR:
    case AmenitiesEnum.CHILDREN_BOOKS_AND_TOYS:
    case AmenitiesEnum.SUITABLE_FOR_INFANTS:
    case AmenitiesEnum.SUITABLE_FOR_CHILDREN:
    case AmenitiesEnum.PACK_N_PLAY_TRAVEL_CRIB:
    case AmenitiesEnum.ROOM_DARKENING_SHADES:
    case AmenitiesEnum.WINDOW_GUARDS:
      return Babysitter;
    case AmenitiesEnum.BATHTUB:
    case AmenitiesEnum.BABY_BATH:
    case AmenitiesEnum.ROLL_IN_SHOWER_WITH_SHOWER_BENCH_OR_CHAIR:
    case AmenitiesEnum.TUB_WITH_SHOWER_BENCH:
      return Bathroom;
    case AmenitiesEnum.BBQ_GRILL:
    case AmenitiesEnum.COOKING_BASICS:
    case AmenitiesEnum.GARDEN_OR_BACKYARD:
    case AmenitiesEnum.COOKWARE:
    case AmenitiesEnum.PATIO_OR_BALCONY:
      return BBQ_Grill;
    case AmenitiesEnum.BEACH_ESSENTIALS:
    case AmenitiesEnum.ESSENTIALS:
    case AmenitiesEnum.GRAB_RAILS_FOR_SHOWER_AND_TOILET:
    case AmenitiesEnum.HANGERS:
    case AmenitiesEnum.LUGGAGE_DROPOFF_ALLOWED:
    case AmenitiesEnum.IRON:
      return Essentials;
    case AmenitiesEnum.BREAKFAST:
    case AmenitiesEnum.KITCHEN:
    case AmenitiesEnum.KETTLE:
      return Kitchen;
    case AmenitiesEnum.CABLE_TV:
    case AmenitiesEnum.TV:
    case AmenitiesEnum.GAME_CONSOLE:
      return TV;
    case AmenitiesEnum.DISABLED_PARKING_SPOT:
    case AmenitiesEnum.FREE_PARKING_ON_PREMISES:
      return Free_Parking;
    case AmenitiesEnum.DINING_TABLE:
    case AmenitiesEnum.CHILDREN_DINNERWARE:
    case AmenitiesEnum.DISHES_AND_SILVERWARE:
      return Dishes;
    case AmenitiesEnum.DISHWASHER:
    case AmenitiesEnum.DRYER:
    case AmenitiesEnum.WASHER:
      return Washer;
    case AmenitiesEnum.DOGS:
    case AmenitiesEnum.OTHER_PET:
    case AmenitiesEnum.PETS_ALLOWED:
    case AmenitiesEnum.PETS_LIVE_ON_THIS_PROPERTY:
      return Dogs;
    case AmenitiesEnum.MICROWAVE:
    case AmenitiesEnum.OVEN:
      return Oven;
    case AmenitiesEnum.GYM:
    case AmenitiesEnum.HOT_TUB:
      return Gym;
    case AmenitiesEnum.INTERNET:
    case AmenitiesEnum.POCKET_WIFI:
    case AmenitiesEnum.WIRELESS_INTERNET:
      return Wifi;
    case AmenitiesEnum.HAIR_DRYER:
      return HairDryer;
    case AmenitiesEnum.LAPTOP_FRIENDLY_WORKSPACE:
      return Laptop;
    case AmenitiesEnum.PRIVATE_ENTRANCE:
    case AmenitiesEnum.DOORMAN:
      return PrivateEntrance;
    case AmenitiesEnum.SHAMPOO:
    case AmenitiesEnum.BODY_SOAP:
    case AmenitiesEnum.CONDITIONER:
    case AmenitiesEnum.SHOWER_GEL:
    case AmenitiesEnum.CLEANING_PRODUCTS:
      return Shampoo;
    case AmenitiesEnum.SWIMMING_POOL:
      return Swimming_Pool;
    case AmenitiesEnum.CLOTHING_STORAGE:
      return Clothings;
    case AmenitiesEnum.COFFEE_MAKER:
    case AmenitiesEnum.COFFEE:
    case AmenitiesEnum.BLENDER:
    case AmenitiesEnum.TOASTER:
      return CoffeeMaker;
    case AmenitiesEnum.REFRIGERATOR:
      return Refrigerator;
    case AmenitiesEnum.FIRE_EXTINGUISHER:
    case AmenitiesEnum.FIRST_AID_KIT:
    case AmenitiesEnum.FIREPLACE_GUARDS:
      return FireExtinguisher;
    case AmenitiesEnum.STOVE:
      return Stove;
    default:
      return Bedroom;
  }
}

export function get_feature(feature: string) {
  switch (feature) {
    case "bathrooms":
      return Bathroom;
    case "bedrooms":
      return Bedroom;
  }
}
