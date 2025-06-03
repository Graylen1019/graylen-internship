import React, { useEffect, useState } from "react";
import axios from "axios";
import { CardForItem } from "../UI/item-card";
import { CardForItemSkeleton } from "../UI/item-card-skeleton";
import { SortBy } from "../UI/sort-by";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
            sortValue ? `?filter=${sortValue}` : ""
          }`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch NFT collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [sortValue]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleSortChange = (value) => {
    setSortValue(value);
    setLoading(true);
  };

  return (
    <>
      <SortBy sortValue={sortValue} onSortChange={handleSortChange} />

      <div className="row" data-aos="fade-in " data-aos-duration="600">
        {loading ? (
          Array(8)
            .fill(0)
            .map((_, index) => <CardForItemSkeleton key={index} />)
        ) : posts.length > 0 ? (
          <>
            {posts.slice(0, visibleCount).map((post) => (
              <React.Fragment key={post.nftId}>
                <CardForItem
                  expiryDate={post?.expiryDate}
                  authorImage={post?.authorImage || ""}
                  authorId={post?.authorId || ""}
                  nftImage={post?.nftImage || ""}
                  nftId={post?.nftId || ""}
                  title={post?.title || ""}
                  price={post?.price || 0}
                  likes={post?.likes || 0}
                />
              </React.Fragment>
            ))}
          </>
        ) : null}
      </div>
      {!loading && (
        <>
          {posts.length > 0 && visibleCount < posts.length && (
            <div className="col-md-12 text-center">
              <button
                id="loadmore"
                className="btn-main lead"
                onClick={handleLoadMore}
              >
                Load more
              </button>
            </div>
          )}
          {posts.length > 0 && visibleCount >= posts.length && (
            <div className="col-md-12 text-center">
              <button id="loadmore" className="btn-main lead" disabled>
                End of list
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ExploreItems;
