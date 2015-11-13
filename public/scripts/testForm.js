var App = React.createClass({
   
    getInitialState: function(){
         var id = window.location.pathname;
                    console.log(window.location.pathname) 
                    return {data: []};
        console.log(this.getParams())
    },

    loadRating: function(beer) {
    // var beerPost = this.state.data;
    $.ajax({
        url: this.props.url + id,
        dataType: 'json',
        cache: false,
        success: function(data){
            console.log("inside success")

            this.setState({data:data});
        }.bind(this),
        error: function(xhr, status, err){
            console.log("Broken url is " + this.props.url)
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
},

componentDidMount: function(){
    this.loadRating();
},


render: function() {
    return (
        <div>
       <h1>Beer Ratings Here</h1>
        </div>
        )
}
})

React.render(<App url="/api/rating/getUserRatings/"/>, document.getElementById('testForm'));

