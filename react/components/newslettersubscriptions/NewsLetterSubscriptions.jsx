import React, { useCallback, useEffect, useState } from "react";
import debug from "sabio-debug";
import NewsLetterSubscriptionsTable from "./NewsLetterSubscriptionTable";
import * as newsletterSubscription from "../../services/newsLetterSubscriptionsService";
import Swal from "sweetalert2";

function NewsLetterSubscriptions() {
  const [state, setState] = useState({
    subscriberData: [],
    dataToDisplay: "all",
    pageIndex: 0,
    pageSize: 1000,
  });

  const _logger = debug.extend("NewsLetterSubscriptions");
  _logger("Current Values in State!...", state);

  useEffect(() => {
    if (state.dataToDisplay === "all") {
      newsletterSubscription
        .GetAllSubscribers(state.pageIndex, state.pageSize)
        .then(onGetSubscriberSuccess)
        .catch(onGetSubscriberError);
    } else if (state.dataToDisplay === "subscribed") {
      newsletterSubscription
        .GetOnlySubscribed(state.pageIndex, state.pageSize)
        .then(onGetSubscriberSuccess)
        .catch(onGetSubscriberError);
    }
  }, [state.dataToDisplay]);

  const onGetSubscriberSuccess = (data) => {
    _logger("Success!... This is subscriber data", data);
    let arrayOfSubs = data.item.pagedItems;

    setState((prevState) => {
      const sData = { ...prevState };
      sData.subscriberData = arrayOfSubs;
      sData.subscriberData = [...sData.subscriberData];
      _logger("sData", sData);
      return sData;
    });
  };

  const onGetSubscriberError = (err) => {
    _logger("Error!...", err);
  };

  const onUpdateStatusSuccess = (response) => {
    _logger("Success! Update Response", response);
    Swal.fire({
      title: "Update Successfull!",
      text: "You Have Updated Status Successfully",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
    setState((prevState) => {
      const sData = { ...prevState };

      sData.subscriberData = sData.subscriberData.map((subscriber) => {
        _logger("subscriber", subscriber);
        if (subscriber.email === response.email) {
          subscriber.isSubscribed = response.isSubscribed;
          return subscriber;
        }
        return subscriber;
      });

      _logger("updated subscriber data", sData.subscriberData);

      return sData;
    });
  };

  const onChangeDataDisplay = (e) => {
    let change = "";
    if (e.target.id === "all") {
      change = "all";
    } else if (e.target.id === "subscribed") {
      change = "subscribed";
    }

    setState((prevState) => {
      const state = { ...prevState };
      state.dataToDisplay = change;
      return state;
    });
  };

  const onUpdateStatusClick = useCallback((values) => {
    _logger("The Value comming from table...", values);
    newsletterSubscription
      .GetSubscriptionUpdate(values)
      .then(onUpdateStatusSuccess)
      .catch(onGetSubscriberError);
  }, []);

  return (
    <React.Fragment>
      <div>
        <NewsLetterSubscriptionsTable
          subs={state.subscriberData}
          update={onUpdateStatusClick}
          dataDisplay={onChangeDataDisplay}
        />
      </div>
    </React.Fragment>
  );
}

export default NewsLetterSubscriptions;
