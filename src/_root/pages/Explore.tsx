import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import GridPostList from "../../components/shared/GridPostList";
import SearchResults from "../../components/shared/SearchResults";
import {
  useGetPosts,
  useSearchPosts,
} from "../../lib/react-query/queriesAndMutations";
import useDebounce from "../../hooks/useDebounce";
import Loader from "../../components/shared/Loader";
import { useInView } from "react-intersection-observer";
import { Models } from "appwrite";

const Explore: React.FC = () => {
  const { ref, inView } = useInView();
  const { 
    data: posts, 
    fetchNextPage, 
    hasNextPage 
  } = useGetPosts();
  
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue, 500);
  
  const { 
    data: searchPosts, 
    isFetching: isSearchFetching 
  } = useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue, fetchNextPage]);

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setSearchValue(e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        {shouldShowSearchResults ? (
          <SearchResults 
            isSearchFetching={isSearchFetching} 
            searchPosts={searchPosts as Models.DocumentList<Models.Document>} 
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4">No posts found</p>
        ) : (
          <GridPostList 
            posts={posts} 
            ref={ref} 
          />
        )}
      </div>
    </div>
  );
};

export default Explore;