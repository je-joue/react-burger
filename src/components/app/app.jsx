import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { MainPage, LoginPage, RegistrationPage, ProfilePage, ForgotPasswordPage, ResetPasswordPage, NotFoundPage, FeedPage, ProfileOrdersPage } from '../../pages';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderInfo from '../order-info/order-info';
import ProtectedRoute from '../protected-route/protected-route';
import { getIngredients } from '../../services/actions/burger-data-actions';
import { getUserInfo } from '../../services/actions/auth-actions';
import { resetConstructor } from '../../services/actions/burger-constructor-actions';
import { closeOrderDetails } from '../../services/actions/order-details-action';

function App() {
  const { isOrderDetailsOpen, order } = useSelector(store => store.orderDetails);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const closeOrderDetailsModal = () => {
    dispatch(closeOrderDetails());
    if (order) {
      dispatch(resetConstructor());
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Switch location={background || location}>
          <Route path='/' exact={true}>
            <MainPage />
          </Route>
          <Route
            path='/ingredients/:id'
            children={<IngredientDetails title="Детали ингредиента" />}
          />
          <Route path='/login' exact={true}>
            <LoginPage/>
          </Route>
          <Route path='/register' exact={true}>
            <RegistrationPage/>
          </Route>
          <Route path='/register' exact={true}>
            <RegistrationPage/>
          </Route>
          <Route path='/forgot-password' exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPasswordPage />
          </Route>
          <Route path='/feed' exact={true}>
            <FeedPage />
          </Route>
          <Route
            path='/feed/:id'
            children={<OrderInfo />}
          />
          <ProtectedRoute path='/profile' exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders'>
            <ProfileOrdersPage />
          </ProtectedRoute>
          <ProtectedRoute
            path='/profile/orders/:id'
            children={<OrderInfo />}
          />
          <Route>
            <NotFoundPage/>
          </Route>
        </Switch>



      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal title="Детали ингредиента" closeModal={() => history.goBack()} >
              <IngredientDetails />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          path='/feed/:id'
          children={
            <Modal closeModal={() => history.goBack()} >
              <OrderInfo />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          path='/profile/orders/:id'
          children={
            <Modal closeModal={() => history.goBack()} >
              <OrderInfo />
            </Modal>
          }
        />
      )}


      {isOrderDetailsOpen &&
        <Modal closeModal={closeOrderDetailsModal}>
          <OrderDetails />
        </Modal>
      }


      </main>
    </div>
  );
}

export default App;


