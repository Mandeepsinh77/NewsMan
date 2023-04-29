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
        contrt: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super();
        // console.log("hii iam constructor from news file");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        // document.title=`${this.props.category}- NewsMan `
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=00609756fdd54ad88cd4e1d4eefa99b9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,
        })
         
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=00609756fdd54ad88cd4e1d4eefa99b9&page=1&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,
        })
    }
    handleNextClick = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=00609756fdd54ad88cd4e1d4eefa99b9&page=${this.state.page + 1}$pageSize=${this.props.pageSize}`;
        //     this.setState({
        //         loading: true
        //     })
        //     let data = await fetch(url);
        //     let parseData = await data.json();
        //     this.setState({
        //         articles: parseData.articles,
        //         page: this.state.page + 1,
        //         loading: false
        //     })
        // }
        this.setState({page:this.state.page+1})
        this.updateNews()

    }

    handlePreClick = async () => {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.contry}&category=${this.props.category}&apiKey=00609756fdd54ad88cd4e1d4eefa99b9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true
        // })
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({
            //     articles: parseData.articles,
            //     page: this.state.page - 1,
            //     loading:false,
            // })
            this.setState({page:this.state.page-1})
            this.updateNews()
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{ margin: "30px 0px" }}>NewsMap - Top {this.props.category} </h1>
                {this.state.loading && <Spinner />}
                <div className='row'>
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage ? element.urlToImage : "./news.png "} newsUrl={element.url ? element.url : "/"} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
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
