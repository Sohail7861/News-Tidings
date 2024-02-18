import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
      country:"in",
      category:"general"
    }
 
    static propTypes = {
      country:PropTypes.string,
      category:PropTypes.string
    }
    capFirstLetter = (string) => {
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
  
    constructor(props){
      super(props);
      this.state={
        articles:[],
        loading:false,
        page:1
      }
      document.title=`Urban Tidings - ${this.capFirstLetter(this.props.category)}`
    }
    /**Lifecycle method , work after render*/
    async componentDidMount(){
      this.setState({loading:true})
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03e9a72cce39460e9c8154146cdea550&page=1&pageSize=12`
      let data=await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);
      this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})

    }

    handlePrevClick = async () => {
      console.log('prev}')


        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03e9a72cce39460e9c8154146cdea550&page=${this.state.page - 1}&pageSize=12`
        this.setState({loading:true})
        let data=await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
       


        this.setState({
          page:this.state.page-1,
          articles:parsedData.articles,
          loading:false
        })
    }

    handleNextClick = async () => {
        console.log('next')

        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/12))){
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03e9a72cce39460e9c8154146cdea550&page=${this.state.page+1}&pageSize=12`;
          this.setState({loading:true})
          let data=await fetch(url);
          let parsedData=await data.json()


          this.setState({
          page:this.state.page+1,
          articles:parsedData.articles,
          loading:false
        })
        }
        
    }

    

  render() {
    return (
      <>
      <div className="container my-3" >
        <div className='text-center' style={{margin:"35px 0px"}}><h2 style={{marginTop:"90px"}}>Top Headlines from {this.capFirstLetter(this.props.category)} </h2></div>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                      <NewsItem  title={element.title?element.title:""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                  </div>
          })}
        </div>  
        <div className="container d-flex justify-content-between" style={{padding:"20px 20px"}}>
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
            <button disabled={this.state.page+1 >= Math.ceil(this.state.totalResults/12)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
      </div>
      
    </>
    )
  }
}

export default News