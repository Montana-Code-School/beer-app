var BeerForm = React.createClass({

  handleSubmit: function(e){

    e.preventDefault();

    var name = React.findDOMNode(this.refs.name).value.trim();
    var image = React.findDOMNode(this.refs.image).value.trim();
    var category = React.findDOMNode(this.refs.category).value.trim();
    var ibu = React.findDOMNode(this.refs.ibu).value.trim();
    var abv = React.findDOMNode(this.refs.abv).value.trim();
    var location = React.findDOMNode(this.refs.location).value.trim();
    var brewery = React.findDOMNode(this.refs.brewery).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();




    if(!name){
      return;
    }

    var data = ({name: name, image: image, category: category, ibu: ibu, abv: abv, location: location, brewery: brewery, description: description});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      data: data,
      type:'POST',
      success: function(response){
        console.log("posting data!",data, response)
        document.location='/enter_beer'
      }.bind(this),
      error: function(xhr, status, err){
        console.log("not posting data!")
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },


  render: function() {
    return (

     <div>
     <div className="col-sm-6 col-md-12">
     <h1>Enter New Beers</h1>
     <hr/>

     
     <form>
     <div className="col-sm-6 col-md-6">
     <div className="form-group">
     <label>Beer Name</label>
     <input type="text" className="form-control" ref="name" placeholder="Beer Name"/>
     </div>

     <div className="form-group">
     <label>Image URL</label>
     <input type="text" className="form-control" ref="image" placeholder="Image URL"/>
     </div>

     <div className="form-group">
     <label>Type of Beer </label>
     <input type="author" className="form-control" ref="category" placeholder="Type of Beer"/>
     </div>

     <div className="form-group">
     <label>IBU</label>
     <input className="form-control" ref="ibu" placeholder="IBU"/>
     </div>

     <div className="form-group">
     <label>ABV</label>
     <input className="form-control" ref="abv" placeholder="ABV"/>
     </div>
     </div>
     <div className="col-sm-6 col-md-6">

     <div className="form-group">
     <label>Location</label>
     <input className="form-control" ref="location" placeholder="Location"/>
     </div>

     <div className="form-group">
     <label>Brewery</label>
     <input className="form-control" ref="brewery" placeholder="Brewery"/>
     </div>

     <div className="form-group">
     <label>Description</label>
     <textarea  rows="9" className="form-control" ref="description" placeholder="Description"></textarea>
     </div>
     </div>
     <button onClick={this.handleSubmit} type="submit" className="btn btn-default"> Submit </button>

     </form>
     <hr/>
     </div>
     </div>

     );
}
});


var OnTapList = React.createClass({

  deleteClick: function(id, beer) {
    var id = id;
    
     var areYouSure = confirm("Are you sure that you want to delete this beer?");
    
    if(areYouSure == true)

    $.ajax({
      url: this.props.url + id,
      dataType: 'json',
      type:'DELETE',
      success: function(response){
        console.log("Deleting data!", response)
        document.location='/enter_beer'
      }.bind(this),
      error: function(xhr, status, err){
        console.log("not deleting data!")
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })

  },
  handleUpdate: function(id){

   
    
    var id = id;


    var name = React.findDOMNode(this.refs.name).value.trim();
    var image = React.findDOMNode(this.refs.image).value.trim();
    var category = React.findDOMNode(this.refs.category).value.trim();
    var ibu = React.findDOMNode(this.refs.ibu).value.trim();
    var abv = React.findDOMNode(this.refs.abv).value.trim();
    var location = React.findDOMNode(this.refs.location).value.trim();
    var brewery = React.findDOMNode(this.refs.brewery).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();



    console.log(id);
    if(!name){
      return;
    }

    var data = ({name: name, image: image, category: category, ibu: ibu, abv: abv, location: location, brewery: brewery, description: description});

    $.ajax({
      url: this.props.url + id,
      dataType: 'json',
      data: data,
      type:'PUT',
      success: function(response){
        console.log("posting data!", data, response)
        document.location='/enter_beer'
      }.bind(this),
      error: function(xhr, status, err){
        console.log("not posting data!")
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },
  getInitialState: function(){
    return {
      fltr: null
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
  render: function() {

    var that = this;

    var beerSort = this.props.data.sort(function(a, b){
           var x = a.name.toLowerCase(), y = b.name.toLowerCase();
           return x < y ? -1 : x > y ? 1 : 0;
           });

    var updateBeerForm = beerSort.map(function(beer){
      if (beer.name === this.state.fltr)
       return (
     <form>
     <h3>{beer.name}</h3>
     <div className="form-group">
     <label>Beer Name</label>
     <input type="text" className="form-control" ref="name" defaultValue={beer.name}/>
     </div>
     <div className="form-group">
     <label>Image URL</label>
     <input type="text" className="form-control" ref="image" defaultValue={beer.image}/>
     </div>

     <div className="form-group">
     <label>Type of Beer </label>
     <input type="author" className="form-control" ref="category" defaultValue={beer.category}/>
     </div>
     <div className="form-group">
     <label>IBU</label>
     <input className="form-control" ref="ibu" defaultValue={beer.ibu}/>
     </div>
     <div className="form-group">
     <label>ABV</label>
     <input className="form-control" ref="abv" defaultValue={beer.abv}/>
     </div><div className="form-group">
     <label>Location</label>
     <input className="form-control" ref="location" defaultValue={beer.location}/>
     </div><div className="form-group">
     <label>Brewery</label>
     <input className="form-control" ref="brewery" defaultValue={beer.brewery}/>
     </div><div className="form-group">
     <label>Description</label>
     <textarea  rows="15" className="form-control" ref="description" defaultValue={beer.description}></textarea>
     </div>
     <button onClick={that.handleUpdate.bind(this, beer._id)} type="submit" className="btn btn-default"> Submit {beer.name} </button>
     </form>
        )
}.bind(this)); 

var beerData = this.props.data.map(function(beer){
     return (
       <div>
            <table className="table">
                   <tbody>
                     <tr>
                      <td style={{width:"80%"}}>{beer.name}</td>
                      <td style={{width:"10%"}}><button onClick={that.toggle.bind(that, beer.name)}><i className="fa fa-pencil"></i></button></td>
                      <td style={{width:"10%"}}><button  onClick={that.deleteClick.bind(this, beer._id)}><i className="fa fa-minus-circle" ></i></button></td>

                     </tr>
                   </tbody>
                 </table>
       </div>
       )
   });

return (

  <div className="container">
  <h1>On Tap Now:</h1>
  <div className="col-md-4 Update">
  {beerData}
  </div>
  <div className="col-md-8">
  {updateBeerForm}
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
      <OnTapList data={this.state.data} url="/api/beer/"/>

      </div>
      )
  }
})

React.render(<BeerForm url="/api/beer/"/>, document.getElementById('beerForm'));
React.render(<App url="/api/beer/"/>, document.getElementById('allBeers'));