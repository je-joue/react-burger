import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { MainPage, LoginPage, RegistrationPage, NotFoundPage } from '../../pages';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Preloader from '../preloader/preloader';
import { getIngredients } from '../../services/actions/burger-data-actions';
import { closeIngredientDetails } from '../../services/actions/ingredient-details-actions';
import { resetConstructor } from '../../services/actions/burger-constructor-actions';
import { closeOrderDetails } from '../../services/actions/order-details-action';

function App() {
  const { ingredients, ingredientsRequest } = useSelector(store => store.burgerData);
  const { currentIngredient } = useSelector(store => store.ingredientDetails);
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

  // const closeIngredientDetailsModal = () => {
  //   dispatch(closeIngredientDetails());
  // };

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


      </main>
    </div>
  );
}

export default App;





// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Switch, BrowserRouter, Route } from 'react-router-dom';

// import AppHeader from '../app-header/app-header.jsx';

// import ProtectedRoute from '../protected-route/protected-route.jsx';
// import {LoginPage, ConstructorPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersPage, IngredientPage, Page404} from '../../pages/index.jsx';

// import { getUser } from '../../services/actions/user';
// import { getCookie } from '../../utils/utils';
// import {getAllIngredients} from '../../services/actions/all-ingredients.js';

// function App() {

//   const dispatch = useDispatch();

//   console.log(getCookie('token'));

//   const allIngredients = useSelector(store => store.allIngredients.items);
//   console.log(allIngredients);

//   useEffect(()=> {
//     dispatch(getAllIngredients());
//     console.log(allIngredients);
//   }, []);

//   useEffect(() => {
//     dispatch(getUser());
//   }, []);

//   return (
//     <>
//       <BrowserRouter>
//         <AppHeader />
//           <Switch>
//             <Route path='/' exact={true}>
//               <ConstructorPage/>
//             </Route>

//             <Route path='/login' exact={true}>
//               <LoginPage/>
//             </Route>

//             <Route path='/register'>
//               <RegisterPage/>
//             </Route>


//             <Route path='/forgot-password'>
//               <ForgotPasswordPage/>
//             </Route>

//             <Route path='/reset-password'>
//               <ResetPasswordPage/>
//             </Route>

//             <ProtectedRoute path='/profile' exact={true}>
//               <ProfilePage/>
//             </ProtectedRoute>

//             <ProtectedRoute path='/profile/orders' exact={true}>
//               <OrdersPage/>
//             </ProtectedRoute>

//             <Route path='/ingredients/:id' exact={true}>
//               <IngredientPage/>
//             </Route>

//             <Route>
//               <Page404/>
//             </Route>
//           </Switch>
//       </BrowserRouter>

//     </>
//   );
// }

// export default App;
