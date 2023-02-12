import React, {useState, useEffect} from "react";

import {Container, StickyButton} from "./styles";
import {Button} from "../../utils/styles";
import {share} from "../../translations/posts";

import Post from "./post";

import {useAppContext} from "../../contexts/app";
import { useUserContext } from "../../contexts/user";
import { useSubsocial } from "../../subsocial";
import { AnySpaceId } from "@subsocial/api/types";

interface PostsProps {
  accountId?: string | undefined;
  spcId?: string;
}

const Posts: React.FC<PostsProps> = ({
  accountId, spcId
}) => {
    const {setPostMenuOpen, language, dark} = useAppContext();
    const {account, spaceId: currSpaceId} = useUserContext();
    const {api} = useSubsocial();
    const [userPosts, setUserPosts] = useState<Array<string>>([]);

    const fetchData = async () => {
      if (!api) return;
      let spaceId = currSpaceId;
      if (spcId) {
        spaceId = +spcId;
      } else {
        if (!accountId) return;
        if (accountId !== account?.address) {
          const profile = await api.base.findProfileSpace(accountId);
          if (!profile) return;
          spaceId = +profile.struct.id.toString();
        }
      }
      const postIds = await api.blockchain.postIdsBySpaceId(spaceId as unknown as AnySpaceId);
      setUserPosts(postIds.map((v) => v.toString()));
    };

    useEffect(() => {
      fetchData();
    }, [api, accountId, spcId]);
    
    return (
      <Container>
        <StickyButton>
          {(account?.address === accountId) && (
            <Button
              bgColor={dark ? "#f5f4f9" : "#1a1a1a"}
              dark={dark}
              onClick={() => setPostMenuOpen!(true)}
            >
              {share[language]}
            </Button>
          )}
        </StickyButton>
        {userPosts.length === 0 && <span>No posts to show.</span>}
        {[...userPosts].reverse().map((pId) => (
          <Post 
            key={pId} 
            postId={pId}
          />
        ))}
      </Container>
    );
};

export default Posts;
