var BeerList = React.createClass({
    handleSubmit: function(id){
  
      var id = id;

      //Goal: Find highest value that has checked===true
      for(var i = 5; i >= 1; i--){
        var refKey = "overall"+i;
        var domNode = React.findDOMNode(this.refs[refKey]);
        if(domNode.checked === true){
          var overall = i;
          break;
        }
      }


     console.log(id);

      if(!overall){
        return;
      }

      var data = ({tasting_notes: tasting_notes, overall: overall});

          $.ajax({
              url: this.props.url + 'beers/' +id + '/rating',
              dataType: 'json',
              data: data,
              type:'POST',
                  success: function(response){
                  console.log("posting data!",data, response)
                  document.location='/'
                  }.bind(this),
                  error: function(xhr, status, err){
                      console.log("not posting data!")
                      console.error(this.props.url, status, err.toString());
                  }.bind(this)
          })
  },

    handleOverall: function(event) {
  
  
    //Uncheck all the stars
    var self = this;
    var arr = [1, 2, 3, 4, 5]
    arr.forEach(function(arrValue) {
      var refKey = 'overall' + arrValue;
      React.findDOMNode(self.refs[refKey]).checked = false
        console.log(refKey);
      })

    
    var ratingValue = Number(event.target.value)
    switch (ratingValue) {
      case 5:
        React.findDOMNode(this.refs.overall5).checked = true
      case 4:
        React.findDOMNode(this.refs.overall4).checked = true
      case 3:
        React.findDOMNode(this.refs.overall3).checked = true
      case 2:
        React.findDOMNode(this.refs.overall2).checked = true
      case 1:
        React.findDOMNode(this.refs.overall1).checked = true
    }
  },

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

    toggleStars: function (name) {
    console.log(name);
    this.setState({
      fltr: name
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
                    <button type="button" className="btn btn-s btn-default" onClick={that.toggleStars.bind(that, beer._id)}><i className="fa fa-beer"></i> Rate</button> &nbsp;
                    <button type="button" className="btn btn-s btn-default"><i className="fa fa-info-circle"></i> {beer.name}</button> 
                    </div>
                    </div>
                   </div>
                   </div>
                   </div>
                   )
}.bind(this));

// pulls up the stars for rating

var getRatingForm = this.props.data.map(function(beer){
    if (beer.name === this.state.fltr)

        return(
            <div>
            {beerData}
          <div className="container">  

          <form>

          <div className="form-group">

          <h3>Overall Rating</h3>
          <input id="checkbox1" className="glyphicon glyphicon-star" ref="overall1" onChange={this.handleOverall} defaultValue="1" type="checkbox" />
          <input id="checkbox1" className="glyphicon glyphicon-star" ref="overall2" onChange={this.handleOverall} defaultValue="2" type="checkbox" />
          <input id="checkbox1" className="glyphicon glyphicon-star" ref="overall3" onChange={this.handleOverall} defaultValue="3" type="checkbox" />
          <input id="checkbox1" className="glyphicon glyphicon-star" ref="overall4" onChange={this.handleOverall} defaultValue="4" type="checkbox" />
          <input id="checkbox1" className="glyphicon glyphicon-star" ref="overall5" onChange={this.handleOverall} defaultValue="5" type="checkbox" />



          </div>
          <button onClick={that.handleSubmit.bind(this, beer._id)} type="submit" className="btn">Submit</button>
          </form>
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
    <div>
    {getRatingForm}
    </div>
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
        <BeerList data={this.state.data} url="/api/rating/"/>
        </div>
        )
}
})

React.render(<App url="/api/beer/"/>, document.getElementById("beerPosts") )
