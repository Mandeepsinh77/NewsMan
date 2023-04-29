import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,author,date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "320px" }}>
        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>{source}</span>
          <img src={imageUrl} style={{ height: "180px" }} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description} ...</p>
            <p className="card-text"><small className='text-muted'> By {author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read more..</a>
          </div>
        </div>

      </div>
    )
  }
}

export default Newsitem
