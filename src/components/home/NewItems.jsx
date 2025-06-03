import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import { CountdownTimer } from "../UI/countdown-timer";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AOS from "aos";

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchNft = async () => {
      try {
        const response = (
          await axios.get(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
          )
        ).data;
        setPosts(response);
      } catch (error) {
        console.error("Failed to fetch NFT collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNft();
  }, []);

  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-in" data-aos-duration="100">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {!loading && posts.length > 0 && (
            <OwlCarousel
              className="owl-theme"
              items={4}
              loop
              margin={24}
              nav
              responsive={{
                0: { items: 1 },
                576: { items: 2 },
                992: { items: 3 },
                1200: { items: 4 },
              }}
            >
              {posts.map((post, index) => (
                <div key={post.id || index} data-aos="fade-up">
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${post.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${post.authorName || "Unknown"}`}
                      >
                        <img
                          className="lazy"
                          src={post.authorImage || AuthorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {post.expiryDate !== null && (
                      <div className="de_countdown">
                        <CountdownTimer expiryDate={post.expiryDate} />
                      </div>
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a
                              href="https://facebook.com"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a
                              href="https://twitter.com"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <button
                              type="button"
                              className="link-button"
                              style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                              }}
                              aria-label="Share via email"
                            >
                              <i className="fa fa-envelope fa-lg"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${post.nftId}`}>
                        {post.nftImage ? (
                          <img
                            src={post.nftImage}
                            className="lazy nft__item_preview"
                            alt={post.title || "NFT image"}
                          />
                        ) : (
                          <div
                            className="lazy nft__item_preview skeleton-box"
                            style={{ width: "100%", height: "240px" }}
                          />
                        )}
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${post.nftId}`}>
                        <h4>{post.title}</h4>
                      </Link>
                      <div className="nft__item_price">{post.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}

          {loading && (
            <OwlCarousel
              className="owl-theme"
              items={4}
              loop
              margin={24}
              nav
              responsive={{
                0: { items: 1 },
                576: { items: 2 },
                992: { items: 3 },
                1200: { items: 4 },
              }}
            >
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={`skeleton-item-${index}`} className="item" data-aos="fade-up">
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <div
                        className="lazy skeleton-box"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div className="de_countdown" style={{ visibility: "hidden" }}>
                      <div
                        className="skeleton-box"
                        style={{
                          width: "75px",
                          height: "15px",
                          borderRadius: "25px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </div>

                    <div className="nft__item_wrap">
                      <div
                        className="lazy nft__item_preview skeleton-box"
                        style={{ width: "100%", height: "180px" }}
                      />
                    </div>
                    <div className="nft__item_info">
                      <div>
                        <div
                          className="skeleton-box"
                          style={{ width: "50px", height: "12px" }}
                        />
                      </div>
                      <div className="nft__item_price">
                        <div
                          className=" skeleton-box"
                          style={{ width: "30px", height: "12px" }}
                        />
                      </div>
                      <div className="nft__item_like">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "12px",
                            height: "8px",
                            marginRight: "4px",
                          }}
                        />
                        <i className="fa fa-heart"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;