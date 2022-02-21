import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="my-3"> 
        <div className="card">
          <img src={imageUrl ? imageUrl : "https://images.hindustantimes.com/tech/img/2022/02/20/1600x900/Untitled_design_-_2022-02-18T130806.018_1645169939172_1645370883784.jpg"} className="card-img-top" alt="Not available"/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
