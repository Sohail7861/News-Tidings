import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title,description,imageUrl,newsUrl,author,date}=this.props;
    return (
      <div className='my-3'>
        
        <div className="card" >
          <img src={!imageUrl?"https://www.livemint.com/lm-img/img/2024/02/10/1600x900/PAKISTAN-ELECTIONS-33_1707530626800_1707530636405.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a  href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
        
      </div>
    )
  }
  }

export default NewsItem