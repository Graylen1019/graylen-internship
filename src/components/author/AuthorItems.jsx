import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { CardForItemSkeleton } from "../UI/item-card-skeleton";
import { CardForItem } from "../UI/item-card";

const AuthorItems = () => {
  const authorId = useParams().authorId; // Extracting authorId from URL parameters
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ nftCollection: [] });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setUser(data || { nftCollection: [] });
      } catch (error) {
        console.error("Failed to fetch NFT collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!loading &&
            user.nftCollection &&
            user.nftCollection.length > 0 &&
            user.nftCollection.map((nft, index) => (
              <CardForItem
                key={nft.nftId}
                expiryDate={nft?.expiryDate}
                authorImage={user?.authorImage}
                authorId={user?.authorId}
                nftImage={nft?.nftImage}
                nftId={nft?.nftId}
                title={nft?.title}
                price={nft?.price}
                likes={nft?.likes}
              />
            ))}
          {loading &&
            Array.from({ length: 8 }).map((_, index) => (
              <CardForItemSkeleton key={index} />
            ))}
          {!loading &&
            user.nftCollection &&
            user.nftCollection.length === 0 && (
              <div className="col-md-12">
                <h3 className="text-center">No NFTs found for this author.</h3>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
