import { QRCodeSVG } from 'qrcode.react';
import { PaperAirplaneIcon, GiftIcon } from "@primer/octicons-react";
import PacmanLoader from "react-spinners/PacmanLoader";
import image from "components/entry_new_h.png";


function FailedTask(props) {
    const failImageUrl = process.env.REACT_APP_FAIL_IMAGE_URL
    return (
        <div className="photo-frame">
            <img src={failImageUrl}  alt="CodeMorpheus" />
            <span className="notfound">查无此人</span>
        </div>
    );
}

function SuccessfulTask(props) {
    return (
        <div className="photo-frame">
            <img src={props.imgUrl}  alt="CodeMorpheus" />
            <div className="photo-frame-info">
            <button className="gift-button" onClick={() => props.setDiveIn(true)}>
              你的身份究竟是?
            </button>
            </div>
        </div>
    );
}

function Entry(props) {
  const handleSubmit = e => {
    e.preventDefault();  // necessary
    props.setUserName(e.target[0].value);
  };
  const styles = {
    backgroundImage: `url(${image})`,
  };

  const waitingImageUrl = process.env.REACT_APP_WAITING_IMAGE_URL

  return (
    <div className="entry" style={styles}>
      {props.isLoading && (
      <div className="photo-frame">
          <img src={waitingImageUrl}  alt="CodeMorpheus" />
          <span className="notfound">飞速运转中 (10-20s)</span>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
        <PacmanLoader
        color={"rgb(202, 82, 68)"}
        loading={props.loading}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
          </div>
      </div>
      )}
      {props.isFetched && (
        props.isSuccess ? (<SuccessfulTask imgUrl={props.imgUrl} setDiveIn={props.setDiveIn}/>) : (<FailedTask />)
      )}
      <form onSubmit={handleSubmit} className="form-container">
          <input type="text" placeholder="请输入您的 GitHub 用户名"/>
          <button type="submit" disabled={props.isLoading}>
            <PaperAirplaneIcon size={16} />
          </button>
      </form>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
            <div style={{ position: "absolute", bottom: "1%", margin: "0px", color: "rgb(202, 82, 68)"}}>
              <span style={{ fontSize: "10px", fontWeight: 800}}>{"OpenDILab 出品，版权所有 © 2023"}</span>
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, marginBottom: "1%", marginRight: "6%"}}>
              <QRCodeSVG value="https://morpheus.opendilab.org.cn" size={32} fgColor={"#AE2012"}/>
            </div>
          </div>
    </div>
  );
}

export default Entry;
