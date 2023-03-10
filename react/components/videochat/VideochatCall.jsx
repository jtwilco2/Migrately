import React, { useState, useCallback, useMemo } from "react";
import {
  useParticipantIds,
  useScreenShare,
  useLocalParticipant,
  useDailyEvent,
  DailyAudio,
} from "@daily-co/daily-react";
import VideochatTile from "./VideochatTile";
import VideochatUserMediaError from "./VideochatUserMediaError";
import * as Icon from "react-bootstrap-icons";
import "../videochat/videochatstyles.css";

export default function VideochatCall() {
  const [getUserMediaError, setGetUserMediaError] = useState(false);

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const { screens } = useScreenShare();
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });

  const localParticipant = useLocalParticipant();
  const isAlone = useMemo(
    () => remoteParticipantIds?.length < 1 || screens?.length < 1,
    [remoteParticipantIds, screens]
  );

  const remoteParticipantIdsMapper = (id) => {
    return <VideochatTile key={id} id={id} />;
  };

  const screensMapper = (screen) => {
    return (
      <VideochatTile
        key={screen.screenId}
        id={screen.session_id}
        isScreenShare
      />
    );
  };

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  const renderCallScreen = () => (
    <div className={screens.length > 0 ? "is-screenshare" : "call"}>
      {localParticipant && (
        <VideochatTile
          id={localParticipant.session_id}
          isLocal
          isAlone={isAlone}
        />
      )}
      {remoteParticipantIds?.length > 0 || screens?.length > 0 ? (
        <>
          {remoteParticipantIds.map(remoteParticipantIdsMapper)}
          {screens.map(screensMapper)}
          <DailyAudio />
        </>
      ) : (
        <div className="info-box">
          <h1 className="h1-waiting">Waiting for others</h1>
          <p>Invite someone by sharing this link:</p>
          <span className="room-url">{window.location.href}</span>
          <button className="btn btn-primary m-3" onClick={copy}>
            Copy Link
            <Icon.Clipboard color="white" size={15} />
          </button>
        </div>
      )}
    </div>
  );

  return getUserMediaError ? <VideochatUserMediaError /> : renderCallScreen();
}
