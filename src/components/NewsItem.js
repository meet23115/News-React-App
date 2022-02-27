import React from 'react'

const NewsItem = (props) =>{
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className="my-3"> 
        <div className="card">
          <div style={{
            display: "flex",
            position: "absolute",
            right: "0",
          }}>
            <span className="badge rounded-pill bg-primary" style={{left: '90%', zIndex: '1'}}>{source}</span>
          </div>
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

export default NewsItem
