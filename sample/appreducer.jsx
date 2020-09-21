import { combineReducers } from 'redux';
import basereducer from './basereducer';
import bomreducer from './bomreducer';
import boqreducer from './boqreducer';
import layoutreducer from './layoutreducer';
import userreducer from './userreducer';
import projectPlanReducer from './projectPlanReducer';
import projectreducer from './projectreducer';
import invitereducer from './invitereducer';
import toastreducer from './toastreducer';
import poreducer from './poreducer';
import dashboardReducer from './dashboardreducer';
import taskreducer from './taskreducer';
import documentreducer from './documentreducer';
import packageReducer from './packageReducer';
import userPackageReducer from './user_packages_reducer';
import portfolioreducer from './portfolioreducer';
import indentReducer from './indentReducer';
import vendorReducer from './vendorReducer';
import utilsReducer from './utilsReducer';
import organisationReducer from './organisationReducer';
import financeReducer from './financeReducer';
import bomPriceReducer from './bomPriceReducer';
import serviceWorkerReducer from './serviceWorkerReducer';
import refreshReducer from './refreshReducer';
import onboardingReducer from './onboardingReducer';
import reportReducer from './reportReducer';
import threadReducer from './threadReducer';
import attendanceReducer from './attendanceReducer';
import notificationReducer from './notificationReducer';
import activityReducer from './activityReducer';
import tagReducer from './tagreducer';
import grnReducer from './grnReducer';
import milestoneReducer from './milestoneReducer';
import configReducer from './configReducer';

const appReducer = combineReducers({
  basereducer,
  bomreducer,
  layoutreducer,
  userreducer,
  boqreducer,
  projectPlanReducer,
  projectreducer,
  invitereducer,
  toastreducer,
  poreducer,
  dashboardReducer,
  taskreducer,
  documentreducer,
  packageReducer,
  userPackageReducer,
  portfolioreducer,
  indentReducer,
  vendorReducer,
  utilsReducer,
  organisationReducer,
  financeReducer,
  bomPriceReducer,
  serviceWorkerReducer,
  refreshReducer,
  onboardingReducer,
  reportReducer,
  threadReducer,
  attendanceReducer,
  notificationReducer,
  activityReducer,
  tagReducer,
  grnReducer,
  milestoneReducer,
  configReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = action.payload;
  }
  return appReducer(state, action);
};

export default rootReducer;