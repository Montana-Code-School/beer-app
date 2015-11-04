var RateForm = React.createClass({

  handleSubmit: function(e){

      e.preventDefault();

      var beer_id = React.findDOMNode(this.refs.beer_id).value.trim();
      var tasting_note = React.findDOMNode(this.refs.tasting_note).value.trim();
      var user_id = React.findDOMNode(this.refs.user_id).value.trim();
      var overall = React.findDOMNode(this.refs.overall).value.trim();

      if(!beer_id){
        return;
      }

      var data = ({beer_id: beer_id, tasting_note: tasting_note, user_id: user_id, overall: overall, abv: abv, location: location, brewery: brewery, description: description});

          $.ajax({
              url: this.props.url,
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

render: function() {

    var that = this;

    var getBeerData = this.props.data.map(function(beer){
      
        return(
          <div className="container">  
          <div className="col-sm-6 col-md-4">
          <div className="beer-display">
          <div className="row">
          <div className="well-beer">
          <img src={beer.image} className="img-responsive"/>
          </div>
          </div>
          </div>
          </div>
          <div className="col-sm-6 col-md-6">
          <div className="row">
          <h1>{beer.name}</h1>
          <hr/>
          </div>
          </div>
          </div>
          )
      
    }.bind(this));

    var rateBeerForm = this.props.data.map(function(beer){
      
        return(

          <form action="" method="POST" role="form">

          <div className="form-group">
          <h3>Tasting Notes</h3>
          <button className="tasting-notes">Coffeeish</button>
          <button className="tasting-notes">Caramelly</button>
          <button className="tasting-notes">Fresh</button>
          <button className="tasting-notes">Herbal</button>
          <button className="tasting-notes">Earthy</button>

          <h3>Over All Rating</h3>

          <input id="checkbox1" className="glyphicon glyphicon-star-empty" type="checkbox" />
          <input id="checkbox1" className="glyphicon glyphicon-star-empty" type="checkbox" />
          <input id="checkbox1" className="glyphicon glyphicon-star-empty" type="checkbox" />
          <input id="checkbox1" className="glyphicon glyphicon-star-empty" type="checkbox" />
          <input id="checkbox1" className="glyphicon glyphicon-star-empty" type="checkbox" />


          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          </form>

           )
      
    });

return (

  <div className="container">
  {getBeerData}
  {rateBeerForm}
  </div>
  );
  }
});  


var App = React.createClass({
  getInitialState: function(){
    return {data: []};
  },

  loadRatings: function(beer) {
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
    this.loadRatings();
  },


  render: function() {
    return (
      <div>
      <RateForm data={this.state.data}/>

      </div>
      )
  }
})

React.render(<App url="/api/beer/"/>, document.getElementById('rateForm'));