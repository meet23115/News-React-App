import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 9,
    country: "in",
    category: "business"
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles: [],
      totalResults: 0,
      loading: true,
      page: 1
    }
    document.title = `NewsNest - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async newsUpdate(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db1beb91a2aa47cf8a0f3facb52c2dc5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    this.setState({ 
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  async componentDidMount(){
    this.newsUpdate();
  }

  handlePrevClick = async()=>{
    this.setState({page: this.state.page - 1});
    this.newsUpdate();
  }

  handleNextClick = async()=>{
    this.setState({page: this.state.page + 1})
    this.newsUpdate();
  }

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db1beb91a2aa47cf8a0f3facb52c2dc5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    this.setState({ 
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults
    })
  };


  render() {
    return (
      <>
        <h1 className="text-center" style={{margin: "30px 0px"}}>NewsNest - {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Loading /> }
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row">
                {this.state.articles.map((element)=>{
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
}

export default News
