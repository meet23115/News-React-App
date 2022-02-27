import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) =>{

  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const newsUpdate = async() =>{
    props.setProgress(25);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(60);
    let parseData = await data.json();
    props.setProgress(80);
    // console.log(parseData);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `NewsNest - ${capitalizeFirstLetter(props.category)}`;
    newsUpdate();
    // eslint-disable-next-line
  }, []);

  // const handlePrevClick = async()=>{
  //   setPage(page - 1);
  //   newsUpdate();
  // }

  // const handleNextClick = async()=>{
  //   setPage(page + 1);
  //   newsUpdate();
  // }

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

    return (
      <>
        <h1 className="text-center" style={{margin: "30px 0px", marginTop: "90px"}}>NewsNest - {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Loading /> }
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row">
                {articles.map((element)=>{
                  return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ?  element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
}

News.defaultProps = {
  pageSize: 9,
  country: "in",
  category: "business"
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
}

export default News
