import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        "https://redux-http-d8df8-default-rtdb.firebaseio.com/cartitems.json"
      );

      const data = await res.json();

      return data;
    };

    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending request failed",
          type: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "sending request",
        type: "warning",
      })
    );

    const sendRequest = async () => {
      //Sens state as sending request

      const res = await fetch(
        "https://redux-http-d8df8-default-rtdb.firebaseio.com/cartitems.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      const data = await res.json();

      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent the Request To Database Successfully",
          type: "success",
        })
      );
    };

    try {
      await sendRequest();
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending request failed",
          type: "error",
        })
      );
    }
  };
};
