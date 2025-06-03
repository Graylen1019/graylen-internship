import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AOS from "aos";

const HotCollections = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNft() {
      try {
        const response = (
          await axios.get(
            "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
          )
        ).data;
        setPosts(response);
      } catch (error) {
        console.error("Failed to fetch NFT collections:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNft();
  }, []);

  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-in" data-aos-duration="100">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        <div className="row" data-aos="fade-in" data-aos-duration="600">
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
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`skeleton-item-${index}`} className="item" data-aos="fade-in">
                  <div className="nft_coll" style={{ width: "100%", height: "320px" }}>
                    <div className="nft_wrap">
                      <div className="skeleton-box" style={{ width: "100%", height: "165px" }}></div>
                    </div>
                    <div style={{ marginTop: "6px" }}>
                      <div className="nft_coll_pp">
                        <div className="skeleton-box" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                      </div>
                      <div className="nft_coll_info" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                        <div className="skeleton-box" style={{ width: "100px", height: "13px", marginBottom: "14px" }}></div>
                        <div className="skeleton-box" style={{ width: "60px", height: "12.5px", marginBottom: "14px" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}

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
                <div key={post.id || `carousel-item-${index}`} className="item" data-aos="fade-in">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${post.nftId || ""}`}>
                        <img
                          src={post.nftImage || nftImage}
                          className="lazy img-fluid"
                          alt={post.title || "NFT image"}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${post.authorId || ""}`}>
                        <img
                          className="lazy pp-coll"
                          src={post.authorImage || AuthorImage}
                          alt={post.authorName || "Author thumbnail"}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/explore/${post.nftId || ""}`}>
                        <h4>{post.title || "Untitled"}</h4>
                      </Link>
                      <span>{post.code || "ERC-192"}</span>
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

export default HotCollections;