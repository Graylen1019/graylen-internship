import React from "react";

export const CardForItemSkeleton = () => {
  return (
    <div
      className="d-item col-lg-3 col-md-6 col-sm-6"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <div
            className="skeleton-box"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        </div>

        <div className="nft__item_wrap">
          <div
            className=" nft__item_preview skeleton-box"
            style={{ width: "100%", height: "225px" }}
          />
        </div>
        <div className="nft__item_info">
          <div
            className="skeleton-box"
            style={{ width: "75px", height: "15px" }}
          />
          <div className="nft__item_price" >
            <div className="skeleton-box" style={{width: "50px", height: "12px"}} />
            </div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <div className="skeleton-box" style={{width: "18px", height: "10px", alignItems: "center", marginLeft: "4px"}} ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
