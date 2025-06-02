import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const [loading, setLoading] = useState(true);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
      const fetchSeller = async () => {
        try {
          const response = (
            await axios.get(
              "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
            )
          ).data;
          setSellers(response);
        } catch (error) {
          console.error("Failed to fetch NFT collections:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSeller();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {!loading &&
                sellers.length > 0 &&
                sellers.map((seller, index) => (
                  <li key={index || seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage || AuthorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                      <span>{seller.price} ETH </span>
                    </div>
                  </li>
                ))}

              {loading &&
                new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                      <div className="author_list_pp">
                        <div className="lazy pp-author">
                          <div
                            className="skeleton-box"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                      </div>
                      <div className="author_list_info">
                        <div>
                          <div
                            className="skeleton-box"
                            style={{
                              width: "100px",
                              height: "12px",
                              display: "flex",
                            }}
                          />
                          <div
                            className="skeleton-box"
                            style={{
                              width: "50px",
                              height: "12px",
                              marginTop: "8px",
                            }}
                          />
                        </div>
                      </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
