import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultsProps = {
        contry: 'in',
        pageSize: 8,
        category: 'general',
    }
    static propType = {
        contry: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        // console.log("hii iam constructor from news file");
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `${(this.props.category).toUpperCase()} | NewsMan `
    }

    async updateNews() {
        const url = "https://newsman-backend.onrender.com/getData";

        this.setState({
            loading: true
        })
        const jsondata = {
            cat: this.props.category,
            page: this.state.page,
            pageSize: this.props.pageSize
        }
        const res = await fetch(url, {
            method: 'POST', // Change the HTTP method to POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsondata),
        });
        const data = await res.json()
        // console.log(data.response)
        // let parseData = await data.json();
        this.setState({
            articles: data.response.articles,
            totalResults: data.response.totalResults,
            loading: false,
        })

    }
    async componentDidMount() {
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }

    handlePreClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{ margin: "30px 0px" }}>NewsMan - Top {this.props.category} </h1>
                {this.state.loading && <Spinner />}
                <div className='row'>
                    {!this.state.loading && this.state.articles?.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_WjEOlzOQJlu0U3_kjwHWp4kiFvAt3KV_BFv586cJ&s"} newsUrl={element.url ? element.url : "/"} author={element.author ? element.author : "Unknown"} date={element.publishedAt ? element.publishedAt : "Not Declare"} source={element.source ? element.source.name : "Unknown"} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePreClick} className="btn btn-dark "> &larr; previous</button>
                    <button disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark mx-3">Next &rarr;</button>
                </div>
            </div>
        )
    }
}
export default News
