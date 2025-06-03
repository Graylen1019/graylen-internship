import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const nftId = useParams().nftId;

  const [nft, setNFT] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fetchNFT = async () => {
        try {
          const response = (
            await axios.get(
              `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
            )
          ).data;
          setNFT(response);
        } catch (error) {
          console.error("Failed to fetch NFT collections:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchNFT();
    }, 5000);
  }, [nftId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {!loading && nft && (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nft?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {" "}
                      {nft?.title} #{nft?.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nft?.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nft?.likes}
                      </div>
                    </div>
                    <p>{nft?.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft?.ownerId}`}>
                              <img
                                className="lazy"
                                src={nft?.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft?.ownerId}`}>
                              {nft?.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nft?.creatorId}`}>
                              <img
                                className="lazy"
                                src={nft?.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nft?.creatorId}`}>
                              {nft?.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{nft?.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {loading && (
              <div className="row">
                <div className="col-md-6 text-center">
                  <div
                    className="skeleton-box"
                    style={{
                      width: "100%",
                      height: "720px",
                      borderRadius: "16px",
                      display: "block",
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div
                      className="skeleton-box"
                      style={{
                        width: "60%",
                        height: "40px",
                        marginBottom: "24px",
                        borderRadius: "8px",
                      }}
                    />
                    <div
                      className="item_info_counts"
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "24px",
                      }}
                    >
                      <div
                        className="skeleton-box"
                        style={{
                          width: "80px",
                          height: "24px",
                          borderRadius: "8px",
                        }}
                      />
                      <div
                        className="skeleton-box"
                        style={{
                          width: "80px",
                          height: "24px",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                    <div
                      className="skeleton-box"
                      style={{
                        width: "90%",
                        height: "40px",
                        borderRadius: "8px",
                      }}
                    />
                    <div
                      className="d-flex flex-row"
                    >
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div
                          className="item_author"
                          // style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className="author_list_pp"
                            style={{ marginRight: "10px" }}
                          >
                            <div
                              className="skeleton-box"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                          <div className="author_list_info">
                            <div
                              className="skeleton-box"
                              style={{
                                width: "100px",
                                height: "20px",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div
                        className="de_tab_content"
                        style={{ marginBottom: "24" }}
                      >
                        <h6>Creator</h6>
                        <div
                          className="item_author"
                          // style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className="author_list_pp"
                            style={{ marginRight: "10px" }}
                          >
                            <div
                              className="skeleton-box"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                          <div className="author_list_info">
                            <div
                              className="skeleton-box"
                              style={{
                                width: "100px",
                                height: "20px",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div
                        className="nft-item-price"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span
                          className="skeleton-box"
                          style={{
                            width: "100px",
                            height: "25px",
                            borderRadius: "8px",
                            display: "inline-block",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
