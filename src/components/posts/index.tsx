import React, {useState, useEffect} from "react";
import toast from "react-hot-toast";

import {Container, StickyButton} from "./styles";
import {postFetch} from "../../translations/toast";
import {Button} from "../../utils/styles";
import {share} from "../../translations/posts";
import { gqlClient, getFeedQuery } from "../../utils/graphql";

import Post from "./post";

import {useAppContext} from "../../contexts/app";
import { useUserContext } from "../../contexts/user";
import { useSubsocial } from "../../subsocial";
import { AnySpaceId } from "@subsocial/api/types";

interface PostsProps {
  accountId?: string | undefined;
  spcId?: string;
  home?: boolean;
}

const Posts: React.FC<PostsProps> = ({
  accountId, spcId, home
}) => {
    const {setPostMenuOpen, language, dark} = useAppContext();
    const {account, spaceId: currSpaceId} = useUserContext();
    const {api} = useSubsocial();
    const [userPosts, setUserPosts] = useState<Array<string>>([]);
    const [fetching, setFetching] = useState<boolean>(false);

    const fetchData = async () => {
      if (!api || fetching) return;
      const postsPromise = new Promise(async (resolve, reject) => {
        try {
          setFetching(true);
          if (home) {
            if (!account?.address) {
              setFetching(false);
              return reject();
            }
            const response = await gqlClient.query({
              query: getFeedQuery(account.address)
            });
            setUserPosts(response.data.posts.map(({ id }: { id: string }) => id));
            setFetching(false);
            resolve(true);
          } else {
            let spaceId = currSpaceId;
            if (spcId) {
              spaceId = +spcId;
            } else {
              if (!accountId) {
                setFetching(false);
                return reject();
              }
              if (accountId !== account?.address) {
                const profile = await api.base.findProfileSpace(accountId);
                if (!profile) {
                  setFetching(false);
                  return reject();
                }
                spaceId = +profile.struct.id.toString();
              }
            }
            const postIds = await api.blockchain.postIdsBySpaceId(spaceId as unknown as AnySpaceId);
            setUserPosts(postIds.map((v) => v.toString()));
            setFetching(false);
            resolve(true);
          }
        } catch (err) {
          setFetching(false);
          return reject();
        }
      });
      toast.promise(postsPromise, {
        loading: postFetch.loading[language],
        success: postFetch.success[language],
        error: postFetch.error[language]
      }, {
        id: "Posts fetch"
      });
    };

    useEffect(() => {
      fetchData();
    }, [api, accountId, spcId]);
    
    return (
      <Container dark={dark}>
        <StickyButton abs>
          {account?.address === accountId && (
            <Button
              bgColor={dark ? "#ffffff" : "#222222"}
              dark={dark}
              onClick={() => setPostMenuOpen!(true)}
            >
              {share[language]}
            </Button>
          )}
        </StickyButton>
        {userPosts.length === 0 && <span>No posts to show.</span>}
        {[...userPosts].reverse().map((pId) => (
          <Post key={pId} postId={pId} />
        ))}
      </Container>
    );
};

export default Posts;
