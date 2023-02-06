import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./daily-news-logo.png";
export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, updatedAt, author } =
      this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={!imageUrl ? logo : imageUrl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-text">
              <small className="text-danger fw-bold">
                Author - {!author ? "Unknown" : author}
              </small>
            </p>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>

            <Link
              to={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read More
            </Link>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              Published at {new Date(updatedAt).toLocaleDateString()}{" "}
              {new Date(updatedAt).toLocaleTimeString()}
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
