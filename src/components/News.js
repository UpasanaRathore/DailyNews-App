import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }; 
    document.title = `${this.capitalizeFirstLetter(this.props.category)}- Daily News`
  }

  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  async updateNews() {
    this.props.setProgress(25);
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(50);
    let parseData = await data.json();
    this.props.setProgress(75);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
  this.updateNews();
  }
  handlePrevClick = async () => {
    await this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false,
      page: this.state.page + 1
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center" style={{marginTop:"80px"}}>Daily News - Top {this.capitalizeFirstLetter(this.props.category)}  Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles?.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        ><div className="row row-cols-1 row-cols-md-3 g-4 my-3 container">
          {this.state.articles.map((element) => {
              return (
                <div className="col " key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    updatedAt={element.publishedAt}
                    author={element.author}
                  />
                </div>
              );
            })}
            </div>
            </InfiniteScroll>
      </div>
    );
  }
}

export default News;
