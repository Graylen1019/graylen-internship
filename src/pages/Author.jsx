import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const authorId = useParams().authorId;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [followed, setFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = (
          await axios.get(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
          )
        ).data;
        setUser(response);
        setFollowerCount(response.followers || 0);
      } catch (error) {
        console.error("Failed to fetch NFT collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authorId]);

  const handleCopy = () => {
    if (user.address) {
      navigator.clipboard.writeText(user.address);
    }
  };

  const handleFollow = () => {
    if (followed) {
      setFollowerCount((prev) => prev - 1);
    } else {
      setFollowerCount((prev) => prev + 1);
    }
    setFollowed((prev) => !prev);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {!loading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={user?.authorImage || ""} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {user?.authorName || ""}
                            <span className="profile_username">
                              @{user?.tag || ""}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {user?.address || ""}
                            </span>
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={handleCopy}
                            >
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">{followerCount}</div>
                        <button
                          className={`btn-main${followed ? " followed" : ""}`}
                          onClick={handleFollow}
                        >
                          {followed ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="profile_avatar">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                        }}
                      />
                      <div className="profile_name">
                        <h4>
                          <div
                            className="skeleton-box"
                            style={{ width: "200px", height: "20px" }}
                          />
                          <span className="profile_username">
                            <div
                              className="skeleton-box"
                              style={{ width: "100px", height: "15px" }}
                            />
                          </span>
                          <span id="wallet" className="profile_wallet">
                            <div
                              className="skeleton-box"
                              style={{ width: "200px", height: "20px" }}
                            />
                          </span>
                        </h4>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div
                          className="profile_follower skeleton-box"
                          style={{ width: "50px", height: "20px" }}
                        />
                        <div
                          className="skeleton-box"
                          style={{ width: "123px", height: "42px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} user={user} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
