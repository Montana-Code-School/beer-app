// var tastingNotes = ["malty", "breadlike", "rich", "deep", "roasty", "cereal", "coffeeish", "caramelly", "toffee-like", "molasses-like", "smoky", "sweet", "autumnal","burnt cream", "oatmeal", "rustic", "layered", "piney", "citrusy", "grapefruity", "earthy", "musty", "spicy", "sharp", "bright", "fresh", "herbal", "lemony", "newly-mown lawn", "floral", "springlike", "brilliant", "minty", "pungent", "grassy"]

//added a comment to the top of rateForm to force an update
var RateForm = React.createClass({
  




  handleSubmit: function(id){
  
      var id = id;


      // var tasting_notes = React.findDOMNode(this.refs["good", "bad", "ugly"]).value;
      
      

      // var selectedNote = []
      // for(var i = 0; i < tastingNotes.length -1; i++){


      //   var noteKey = tastingNotes[i];

      //   var domNodeNote = React.findDOMNode(this.refs[noteKey]);
      //   alert(domNodeNote);
      //   if (domNodeNote.checked === true){
      //     selectedNote.push(noteKey);
      //     alert(selectedNote);
      //   }
      // }
      // // for(var i = 0; i > )

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

    getInitialState: function(){
    return {
      fltr: null,
      selected: false
    };
  },  

  toggle: function (name) {
    console.log(name);
    this.setState({
      fltr: name
    })
  },
  reToggle: function (id) {
    this.setState({
      fltr: null
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

  handleSelect: function(event){
    this.setState(event.target.checked = true);
  },

  render: function() {

    var that = this;

    // var tastingNotesMap = this.props.notes.map(function(note){
    //   return(
    //       <div>
    //       <input id="checkbox1" className="glyphicon glyphicon-star" ref="good" defaultValue="good" type="checkbox" /> <p> Good </p>
    //       <input id="checkbox1" className="glyphicon glyphicon-star" ref="bad"  defaultValue="bad" type="checkbox" /><p>Bad</p>
    //       <input id="checkbox1" className="glyphicon glyphicon-star" ref="ugly"  defaultValue="ugly" type="checkbox" /><p>ugly</p>
    //       </div>)

    // }.bind(this));

    var getBeerData = this.props.data.map(function(beer){
    if (beer.name === this.state.fltr)

        return(
          <div className="container">  
          <div className="col-sm-3 col-md-3">
          <div className="beer-display">
          <div className="row">
          <div className="well-beer">
          <img src={beer.image} className="img-responsive"/>
          </div>
          </div>
          </div>
          </div>
          <div className="col-sm-5 col-md-5">
          <div className="row">
          <h1>{beer.name}</h1>
          <hr/>
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
          </div>
          )
      
    }.bind(this));

var beerData = this.props.data.map(function(beer){
     return (
       <div>
            <table className="table">
                   <tbody>
                     <tr>
                      <td style={{width:"65%"}}>{beer.name}</td>
                      <td style={{width:"35%"}}><button onClick={that.toggle.bind(that, beer.name)}><i className="fa fa-beer"></i> Rate</button></td>
                     </tr>
                   </tbody>
                 </table>
       </div>
       )
   });

return (

  <div className="container">
           <div className="col-md-3">

        {beerData}
        </div>
         <div className="col-md-8">

        {getBeerData}
        </div>

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
      <RateForm data={this.state.data} url="/api/rating/"/>

      </div>
      )
  }
})

React.render(<App url="/api/rating/"/>, document.getElementById('rateForm'));


          // <button className="tasting-notes" ref="tasting_note" defaultValue="coffeeish">Coffeeish</button>
          // <button className="tasting-notes" ref="tasting_note" defaultValue="caramelly">Caramelly</button>
          // <button className="tasting-notes" ref="tasting_note" defaultValue="fresh">Fresh</button>
          // <button className="tasting-notes" ref="tasting_note" defaultValue="herbal">Herbal</button>
          // <button className="tasting-notes" ref="tasting_note" defaultValue="earthy">Earthy</button>