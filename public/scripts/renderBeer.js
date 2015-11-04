var BeerList = React.createClass({
    getInitialState: function(){
        return {
            fltr: null
        };
    },

    toggle: function (category) {
        this.setState({
            fltr: category
        })
    },
    reToggle: function (category) {
        this.setState({
            fltr: null
        })
    },
    toggleInfo: function (beerInfo) {
        this.setState({
            fltr: beerInfo
        })
    },
    render: function() {
        var that = this;
        var beerCats = [];
        this.props.data.map(function(beer){
            if(beerCats.indexOf(beer.category) === -1) {
                beerCats.push(beer.category);
                
            } else {
                //push a value into beerCats array
            }
            // return beerCats [beer.category]

        })

        var beerButtons = beerCats.map(function(category){
            return (
                <button className="beer-cat" onClick={that.toggle.bind(that, category)}>{category}</button>
                )
        });

        // var imagePlaceHolder = this.props.data.map(function(beer){
        //     if (beer.image === null) {
        //         return "http://www.beerglasseshq.com/images/pintglass.gif"
        //     } else {
        //         return beer.image
        //     }
        // });
        // var beerInfo = this.props.data.map(function(beerInfo){
        //     return (
        //         <button className="btn btn-s btn-default" onClick={that.toggle.bind(that, beerInfo)}>{beerInfo.name}</button>
        //         )
        // });
        var beerData = this.props.data.map(function(beer){
           if (beer.category === this.state.fltr || !this.state.fltr)
               return (
                    <div className="col-sm-6 col-md-4">
                    <div className="beer-display">
                    <div className="row">
                   <div className="well-beer">
                   <img src={beer.image} className="img-responsive"/>
                   <div className="caption">
                   <h3>{beer.name}</h3><br/>
                   <h4>
                   {beer.abv > 0 ? ' ABV ' + beer.abv + '% / ': ''} {beer.ibu}{beer.ibu > 0 ? ' IBU / ' : ''}{beer.location}
                   </h4>
                   <hr className="short-rule"/>                        
                   <p className="brewery">
                   {beer.brewery}
                   </p>
                   <p className="rating"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i><i className="fa fa-star-o"></i></p>
                    <a href="/rate"><button type="button" className="btn btn-s btn-default"><i className="fa fa-beer"></i> Rate</button></a> &nbsp;
                    <button type="button" className="btn btn-s btn-default"><i className="fa fa-info-circle"></i> {beer.name}</button> 
                    </div>
                    </div>
                   </div>
                   </div>
                   </div>
                   )
}.bind(this));
return (

    <div>
    <div>
    <button className="beer-cat" onClick={that.reToggle}>All</button>
    {beerButtons}
    </div>                 
    {beerData}
    </div>

    );
}
});


var App = React.createClass({
    getInitialState: function(){
        return {data: []};
    },

    loadBeers: function(beer) {
    // var beerPost = this.state.data;
    $.ajax({
        url: this.props.url,
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
    this.loadBeers();
},


render: function() {
    return (
        <div>
        <BeerList data={this.state.data}/>
        </div>
        )
}
})

React.render(<App url="/api/beer/"/>, document.getElementById("beerPosts") )
