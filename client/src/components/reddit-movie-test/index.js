loadVideos = () => {
  API.getVideos().then(res => {
    const redditdata = res.data.data.children;
    let YTtitle = [];
    let YTHotStr = [];
    let reddit = [];
    for (let i = 0; i < redditdata.length; i++) {
      // console.log(redditdata[i].data);
      // console.log(redditdata[i].data.media.type);
      
      // const videoType = 
      if (redditdata[i].data.secure_media === "null" || null || undefined || "undefined") {
        // console.log("videoType is null");
        continue;
        
      }
      
      else if (redditdata[i].data.media.type === "youtube.com") {
        console.log("hello");
        
        //getting just the infromaion we need from huge string
        const redditSplit = redditdata[i].data.media_embed.content.split(
          "embed/"
        )[1];
        //title
        YTtitle = redditdata[i].data.title;
        //getting just the infromaion we need after ? in string
        YTHotStr = redditSplit.substring(0, redditSplit.indexOf("?"));
        //pushing to obj
        reddit.push({ name: YTtitle, YTstr: YTHotStr });
        console.log(reddit);
        
      }
    }
    console.log("hello");
    this.setState({ featuredVid: reddit[0] });
 
    reddit.shift();
    this.setState({ videos: reddit });
    
    //console.log(this.state.featuredVid);
  });
}

//for movie vidoes, and anything else we want to come up with
//must .split(" ").join("+") string for query to work correctly.
loadMovieInfo = (query)=>{
  API.getMovieInfo(query).then(res =>{
    // console.log(res.data.results);
    const searchResult = res.data.results[0].id;
    //second call for api video results
      API.getMovieVideo(searchResult).then(res =>{
        // console.log(res.data);
        const videoResults = res.data.results;
        let YTMovieKey = [];
        let YTMovieName= [];
        let movieSearch = [];

        //max of 10 for video search
        for (let i = 0; i < 10 && i < videoResults.length; i++) {
          YTMovieKey = videoResults[i].key;
          YTMovieName=videoResults[i].name
          movieSearch.push({name:YTMovieName, YTstr:YTMovieKey})
        }
        this.setState({movieVideos:movieSearch});
        // console.log(this.state);
        
      })
  })
}

LoadLandingMovieInfo = () =>{
  API.getMoviePop().then(res=>{
    const searchResult = res.data.results;
    let popMovies = [];
    // console.log(searchResult);
    for (let i = 0; i < 10 && i < searchResult.length; i++) {
    popMovies.push(searchResult[i].id);
    }
    for (let i = 0; i < popMovies.length; i++) {
      this.popMovies(popMovies[i])
      // console.log(popMovies[i]);
      
    }
  })
}

popMovies = (query) =>{
  let arr = []
  let movieSearch = [];
  API.getMovieVideo(query).then(res =>{
    // console.log(res.data);
    const videoResults = res.data.results;
    let YTMovieKey = [];
    let YTMovieName= [];

    // console.log(videoResults);s
    
    
      // YTMovieKey = videoResults[0].key;
      console.log(videoResults[0].key);
       
      YTMovieName=videoResults[0].name
      movieSearch.push({name:YTMovieName, YTstr:YTMovieKey})
      // console.log(movieSearch);
      this.popMoviesCount(movieSearch)
    })
}

popMoviesCount = (count)=>{
    let moviearr = [];
    moviearr.push(count)
    // moviearr.concat(moviearr)
    // moviearr.append(count)
    console.log(moviearr);
    
}