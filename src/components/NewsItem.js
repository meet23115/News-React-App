import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3"> 
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left: '90%', zIndex: '1'}}>{source}</span>
          <img src={imageUrl ? imageUrl : "https://images.hindustantimes.com/tech/img/2022/02/20/1600x900/Untitled_design_-_2022-02-18T130806.018_1645169939172_1645370883784.jpg"} className="card-img-top" alt="Not available"/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="class-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toLocaleDateString()} at {new Date(date).toLocaleTimeString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
